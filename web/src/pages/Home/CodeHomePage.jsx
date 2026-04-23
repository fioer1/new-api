/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Copy,
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { copy, showSuccess } from '../../helpers';
import { useTranslation } from 'react-i18next';

const BRAND_ORANGE = '#F5A041';
const BRAND_ORANGE_DARK = '#E8852A';

const metricItems = [
  { label: '接入模型', value: '30+', hint: '主流大模型持续扩展中' },
  { label: '调度策略', value: 'Smart', hint: '自动熔断 / 智能路由' },
  { label: '服务可用', value: '24×7', hint: '全天候号池健康监控' },
];

const capabilityItems = [
  {
    icon: ShieldCheck,
    title: '稳定优先',
    description: '异常自动切换、账号分层、可用性优先调度，入口永远干净。',
  },
  {
    icon: Layers3,
    title: '统一号池',
    description: '账号、渠道与模型入口全部收敛到一个面板，一个地址对外。',
  },
  {
    icon: Gauge,
    title: '透明计量',
    description: '按调用实时计费，用量与费用面板清晰，随时导出明细。',
  },
];

const highlights = [
  'OpenAI 兼容',
  '统一号池',
  '实时监控',
  '一键接入',
];

const CodeHomePage = ({
  status,
  serverAddress,
  docsLink,
  endpointValue,
}) => {
  const { t } = useTranslation();
  const systemName = status?.system_name || 'Token吧';
  const version = status?.version || 'home-page';
  const logo = status?.logo || '/tokenbar-logo.png';
  const endpointAddress = `${serverAddress}${endpointValue}`;

  const handleCopy = async () => {
    const ok = await copy(endpointAddress);
    if (ok) showSuccess(t('已复制到剪切板'));
  };

  return (
    <div className='relative min-h-screen overflow-hidden bg-[#FFFBF4] text-slate-900'>
      {/* 背景层：暖米底 + 极浅橙光晕，不再是全黑 */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(900px 480px at 12% -10%, rgba(245,160,65,0.22), transparent 60%),' +
            'radial-gradient(700px 420px at 100% 0%, rgba(245,160,65,0.10), transparent 55%),' +
            'linear-gradient(180deg,#FFF7E8 0%,#FFFBF4 38%,#FFFFFF 100%)',
        }}
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 h-px'
        style={{
          background:
            'linear-gradient(90deg,transparent,rgba(245,160,65,0.45),transparent)',
        }}
      />

      <div className='relative mx-auto w-full max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8'>
        {/* Hero */}
        <section className='grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,440px)] lg:items-start'>
          <div>
            <div
              className='inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide'
              style={{
                borderColor: 'rgba(245,160,65,0.35)',
                background: 'rgba(245,160,65,0.10)',
                color: BRAND_ORANGE_DARK,
              }}
            >
              <BadgeCheck className='h-3.5 w-3.5' />
              {systemName} · 号池 API 网关
            </div>

            <h1 className='mt-7 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl'>
              一个高速、稳定、统一的
              <br />
              <span
                style={{
                  background: `linear-gradient(90deg, ${BRAND_ORANGE_DARK}, ${BRAND_ORANGE})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                号池 API 入口
              </span>
            </h1>

            <p className='mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-[17px]'>
              把账号、渠道和模型入口全部收敛到一个面板。兼容 OpenAI
              协议，前台只保留一个地址，调度、监控、计费全自动接管。
            </p>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <Link
                to='/register'
                className='group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5'
                style={{
                  background: `linear-gradient(135deg, ${BRAND_ORANGE} 0%, ${BRAND_ORANGE_DARK} 100%)`,
                  boxShadow: '0 14px 32px -12px rgba(232,133,42,0.55)',
                }}
              >
                立即开始
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
              </Link>
              <Link
                to='/login'
                className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-orange-300 hover:text-orange-600'
              >
                进入控制台
              </Link>
              {docsLink && (
                <a
                  href={docsLink}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-slate-500 transition-colors hover:text-orange-600'
                >
                  接口文档
                  <ArrowRight className='h-4 w-4' />
                </a>
              )}
            </div>

            <div className='mt-7 flex flex-wrap gap-2'>
              {highlights.map((item) => (
                <span
                  key={item}
                  className='inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600'
                >
                  <CheckCircle2
                    className='h-3.5 w-3.5'
                    style={{ color: BRAND_ORANGE }}
                  />
                  {item}
                </span>
              ))}
            </div>

            {/* 指标卡 */}
            <div className='mt-10 grid gap-3 sm:grid-cols-3'>
              {metricItems.map((item) => (
                <div
                  key={item.label}
                  className='group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-[0_12px_30px_-18px_rgba(232,133,42,0.35)]'
                >
                  <p className='text-xs font-medium uppercase tracking-wider text-slate-500'>
                    {item.label}
                  </p>
                  <p
                    className='mt-3 text-3xl font-bold'
                    style={{ color: BRAND_ORANGE_DARK }}
                  >
                    {item.value}
                  </p>
                  <p className='mt-1 text-xs text-slate-500'>{item.hint}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：Live Console 预览卡片 */}
          <div className='relative lg:mt-2'>
            <div
              className='absolute -left-6 -top-6 hidden h-40 w-40 rounded-full lg:block'
              aria-hidden
              style={{
                background: 'rgba(245,160,65,0.28)',
                filter: 'blur(60px)',
              }}
            />
            <div className='relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)]'>
              {/* 窗口顶栏 */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1.5'>
                  <span className='h-2.5 w-2.5 rounded-full bg-[#FF6A5C]' />
                  <span className='h-2.5 w-2.5 rounded-full bg-[#FFBD3E]' />
                  <span className='h-2.5 w-2.5 rounded-full bg-[#2ECC71]' />
                </div>
                <span className='rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[11px] font-semibold text-orange-600'>
                  {version}
                </span>
              </div>

              {/* 品牌卡片 */}
              <div className='mt-5 flex items-center gap-4 rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-orange-50/40 p-4'>
                <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-white p-2'>
                  <img
                    src={logo}
                    alt={systemName}
                    className='h-full w-full object-contain'
                  />
                </div>
                <div className='min-w-0'>
                  <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
                    Live Console
                  </p>
                  <p className='mt-1 truncate text-lg font-bold text-slate-900'>
                    {systemName}
                  </p>
                  <p className='mt-0.5 truncate text-xs text-slate-500'>
                    号池 API 入口 · 正在运行
                  </p>
                </div>
              </div>

              {/* 健康度进度 */}
              <div className='mt-5 space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4'>
                {metricItems.map((item, index) => (
                  <div key={item.label}>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='font-medium text-slate-600'>
                        {item.label}
                      </span>
                      <span className='font-semibold text-slate-900'>
                        {item.value}
                      </span>
                    </div>
                    <div className='mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200/70'>
                      <div
                        className='h-full rounded-full transition-all'
                        style={{
                          width: `${88 - index * 10}%`,
                          background: `linear-gradient(90deg, ${BRAND_ORANGE}, ${BRAND_ORANGE_DARK})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* API 端点 */}
              <div className='mt-4 rounded-2xl border border-slate-100 bg-white p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='min-w-0 flex-1'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
                      API Base URL
                    </p>
                    <p className='mt-1.5 break-all font-mono text-sm font-medium text-slate-900'>
                      {endpointAddress}
                    </p>
                  </div>
                  <button
                    type='button'
                    onClick={handleCopy}
                    className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600'
                    aria-label='复制 API 地址'
                  >
                    <Copy className='h-4 w-4' />
                  </button>
                </div>
              </div>

              {/* 两格状态 */}
              <div className='mt-4 grid grid-cols-2 gap-3'>
                <div className='rounded-2xl border border-slate-100 bg-white p-4'>
                  <div
                    className='flex items-center gap-2 text-xs font-semibold'
                    style={{ color: BRAND_ORANGE_DARK }}
                  >
                    <Sparkles className='h-4 w-4' />
                    Pool Health
                  </div>
                  <p className='mt-2 text-2xl font-bold text-slate-900'>
                    98.7%
                  </p>
                  <p className='mt-1 text-xs text-slate-500'>
                    熔断 · 切换 · 状态感知
                  </p>
                </div>
                <div className='rounded-2xl border border-slate-100 bg-white p-4'>
                  <div
                    className='flex items-center gap-2 text-xs font-semibold'
                    style={{ color: BRAND_ORANGE_DARK }}
                  >
                    <Zap className='h-4 w-4' />
                    Routing
                  </div>
                  <p className='mt-2 text-2xl font-bold text-slate-900'>
                    Fast
                  </p>
                  <p className='mt-1 text-xs text-slate-500'>
                    智能路由 · 低延迟
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 能力卡片 */}
        <section className='mt-20 grid gap-4 md:grid-cols-3'>
          {capabilityItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className='group rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_20px_40px_-24px_rgba(232,133,42,0.45)]'
              >
                <div
                  className='flex h-11 w-11 items-center justify-center rounded-xl text-white'
                  style={{
                    background: `linear-gradient(135deg, ${BRAND_ORANGE}, ${BRAND_ORANGE_DARK})`,
                  }}
                >
                  <Icon className='h-5 w-5' />
                </div>
                <h3 className='mt-5 text-lg font-bold text-slate-900'>
                  {item.title}
                </h3>
                <p className='mt-2 text-sm leading-6 text-slate-600'>
                  {item.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* 底部 CTA */}
        <section className='mt-16'>
          <div
            className='relative overflow-hidden rounded-3xl border border-orange-200 p-8 sm:p-10'
            style={{
              background:
                'linear-gradient(135deg,#FFF3DE 0%,#FFE7C2 50%,#FFD79B 100%)',
            }}
          >
            <div className='relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center'>
              <div>
                <h3 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
                  现在就把你的号池接入 {systemName}
                </h3>
                <p className='mt-2 max-w-xl text-sm text-slate-700 sm:text-base'>
                  注册账号后 1 分钟完成接入，兼容 OpenAI SDK，零改动迁移。
                </p>
              </div>
              <Link
                to='/register'
                className='inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5'
              >
                立即注册
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CodeHomePage;
