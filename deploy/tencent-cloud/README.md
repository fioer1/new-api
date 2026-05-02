# Tencent Cloud Deployment

This folder deploys the existing `home-page` build of `new-api` to a Tencent Cloud Linux server with Docker Compose.

Recommended target: Tencent Cloud Lighthouse or CVM, Ubuntu 22.04/24.04, 4 vCPU / 4 GB RAM minimum. Use Hong Kong or another non-mainland region if you want to keep `tokenbar.org`; mainland China hosting usually requires ICP filing, and `.org` domains may not be eligible for ICP filing.

## 1. Create Server

1. Create a Tencent Cloud Lighthouse or CVM instance.
2. Pick Ubuntu 22.04/24.04, or a Tencent Docker application image.
3. Open inbound ports in the Tencent Cloud firewall/security group:
   - `22` or your SSH port
   - `80`
   - `443`
4. Do not open PostgreSQL `5432` or Redis `6379` to the public internet.

## 2. Install Docker

On the server:

```bash
sudo apt update
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"
newgrp docker
docker version
docker compose version
```

## 3. Upload Deploy Files

From this project directory on your local machine:

```powershell
scp -r -P 22 .\deploy\tencent-cloud root@YOUR_TENCENT_IP:/opt/new-api
```

If your SSH port is not `22`, replace it in the command.

## 4. Configure Secrets

On the server:

```bash
cd /opt/new-api/tencent-cloud
cp .env.example .env
openssl rand -base64 24
openssl rand -base64 32
nano .env
```

Replace:

- `POSTGRES_PASSWORD`
- `REDIS_PASSWORD`
- `SESSION_SECRET`
- `DOMAIN`
- `ACME_EMAIL`

Use `DOMAIN=:80` for first IP-only testing. After DNS points to the server, set `DOMAIN=your-domain.com` and restart the stack.

If the GHCR image is private, log in before pulling:

```bash
echo "YOUR_GITHUB_PAT" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

The token only needs `read:packages`.

## 5. Start

```bash
cd /opt/new-api/tencent-cloud
docker compose pull
docker compose up -d
docker compose ps
```

Check health:

```bash
curl -i http://127.0.0.1/api/status
docker compose logs --tail=80 new-api
```

For domain deployment:

1. Point an `A` record to the Tencent Cloud public IP.
2. Set `DOMAIN=your-domain.com` in `.env`.
3. Run:

```bash
docker compose up -d
curl -i https://your-domain.com/api/status
```

## 6. Update Existing Deployment

After pushing to the `home-page` branch and waiting for GitHub Actions to publish `ghcr.io/fioer1/new-api:home-page`:

```bash
cd /opt/new-api/tencent-cloud
docker compose pull new-api
docker compose up -d --force-recreate new-api
docker compose logs --tail=80 new-api
```

## 7. Backup

Database backup:

```bash
cd /opt/new-api/tencent-cloud
mkdir -p backups
docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' > "backups/new-api-$(date +%F-%H%M%S).sql"
```

Volume-level data to preserve:

- `postgres_data`
- `redis_data`
- `new_api_data`
- `new_api_logs`
- `caddy_data`

## 8. Restore Database

```bash
cd /opt/new-api/tencent-cloud
cat backups/YOUR_BACKUP.sql | docker compose exec -T postgres sh -c 'psql -U "$POSTGRES_USER" "$POSTGRES_DB"'
```

## 9. Common Checks

```bash
docker compose ps
docker compose logs --tail=120 caddy
docker compose logs --tail=120 new-api
docker compose exec postgres sh -c 'pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
docker compose exec redis sh -c 'redis-cli -a "$REDIS_PASSWORD" ping'
```

If HTTPS does not issue, verify DNS points to the Tencent Cloud public IP and ports `80` and `443` are open in the Tencent Cloud security group.
