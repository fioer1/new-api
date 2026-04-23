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
  Copy,
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { copy, showSuccess } from '../../helpers';
import { useTranslation } from 'react-i18next';

const metricItems = [
  { label: '接入模型', value: '30+' },
  { label: '调度策略', value: 'Smart Pooling' },
  { label: '服务可用', value: '24 / 7' },
];

const capabilityItems = [
  {
    icon: ShieldCheck,
    title: '稳定优先',
    description: '异常切换、账号分层与可用性优先，让入口看起来始终干净稳定。',
  },
  {
    icon: Layers3,
    title: '统一号池',
    description: '把账号、渠道和模型入口收敛到一个面板里，前台只保留一个地址。',
  },
  {
    icon: Gauge,
    title: '挂首页',
    description: '保留系统原有导航和后台，只把首页改成更像品牌站的第一屏。',
  },
];

const endpointHighlights = [
  'OpenAI Compatible',
  '统一号池',
  '黑橙主题',
  '稳定调度',
];

const CodeHomePage = ({
  status,
  serverAddress,
  docsLink,
  endpointValue,
}) => {
  const { t } = useTranslation();
  const logo = status?.logo || '/logo.png';
  const systemName = status?.system_name || 'Token吧';
  const version = status?.version || '';
  const endpointAddress = `${serverAddress}${endpointValue}`;

  const handleCopyBaseURL = async () => {
    const ok = await copy(endpointAddress);
    if (ok) {
      showSuccess(t('已复制到剪切板'));
    }
  };

  return (
    <div className='relative overflow-hidden bg-[#050505] text-white'>
      <div className='absolute inset-0 bg-[linear-gradient(180deg,#070707_0%,#050505_52%,#080808_100%)]' />
      <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent' />

      <div className='relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20'>
        <section className='grid min-h-[calc(100vh-148px)] gap-12 lg:grid-cols-[minmax(0,1.05fr)_430px] lg:items-center'>
          <div className='max-w-4xl'>
            <div className='inline-flex items-center gap-3 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-200 shadow-[0_0_40px_rgba(255,122,0,0.08)]'>
              <BadgeCheck className='h-4 w-4' />
              {systemName} Gateway
            </div>

            <div className='mt-8'>
              <h1 className='text-5xl font-semibold leading-[0.92] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl'>
                一个高速、稳定、统一的
                <br />
                号池 API 入口
              </h1>
              <p className='mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg'>
                首页按挂首页的方式处理，不重新造整站，不动你原有后台结构。
                只把第一屏改成更接近品牌站的观感，让入口更像产品，而不是默认面板。
              </p>
            </div>

            <div className='mt-10 flex flex-wrap items-center gap-4'>
              <Link
                to='/register'
                className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff9c3a] to-[#ff6a00] px-6 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5'
              >
                立即开始
                <ArrowRight className='h-4 w-4' />
              </Link>
              <Link
                to='/login'
                className='inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-medium text-white/92 transition-colors duration-200 hover:border-orange-400/40 hover:bg-white/10'
              >
                进入控制台
              </Link>
              {docsLink && (
                <a
                  href={docsLink}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center gap-2 rounded-full px-2 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:text-orange-200'
                >
                  接口文档
                  <ArrowRight className='h-4 w-4' />
                </a>
              )}
            </div>

            <div className='mt-10 flex flex-wrap gap-3'>
              {endpointHighlights.map((item) => (
                <span
                  key={item}
                  className='rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-zinc-200'
                >
                  {item}
                </span>
              ))}
            </div>

            <div className='mt-12 grid gap-4 sm:grid-cols-3'>
              {metricItems.map((item) => (
                <div
                  key={item.label}
                  className='rounded-[24px] border border-white/10 bg-[#0d0d0f] p-5'
                >
                  <p className='text-sm text-zinc-400'>{item.label}</p>
                  <p className='mt-3 text-2xl font-semibold text-white'>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='relative'>
            <div className='relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0b0b0d] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.42)]'>
              <div className='relative'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='h-2.5 w-2.5 rounded-full bg-[#ff7a00]' />
                    <span className='h-2.5 w-2.5 rounded-full bg-white/25' />
                    <span className='h-2.5 w-2.5 rounded-full bg-white/15' />
                  </div>
                  <div className='rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-200'>
                    {version || 'home-page'}
                  </div>
                </div>

                <div className='mt-7 rounded-[28px] border border-white/8 bg-[#090909] p-5'>
                  <div className='flex items-center justify-between gap-4'>
                    <div>
                      <p className='text-xs uppercase tracking-[0.28em] text-zinc-500'>
                        Live Console
                      </p>
                      <p className='mt-3 text-2xl font-semibold text-white'>
                        {systemName}
                      </p>
                      <p className='mt-2 text-sm text-zinc-400'>
                        黑橙主题挂首页，后台结构保持不动。
                      </p>
                    </div>
                    <div className='flex h-24 w-24 items-center justify-center rounded-[26px] border border-white/10 bg-[#111111] p-4'>
                      <img
                        src={logo}
                        alt={systemName}
                        className='h-full w-full object-contain'
                      />
                    </div>
                  </div>

                  <div className='mt-6 space-y-3'>
                    {metricItems.map((item, index) => (
                      <div key={item.label}>
                        <div className='flex items-center justify-between text-sm text-zinc-300'>
                          <span>{item.label}</span>
                          <span className='text-white'>{item.value}</span>
                        </div>
                        <div className='mt-2 h-2 overflow-hidden rounded-full bg-white/8'>
                          <div
                            className='h-full rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500'
                            style={{ width: `${84 - index * 13}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='mt-5 rounded-[28px] border border-white/8 bg-[#101012] p-5'>
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <p className='text-sm text-zinc-400'>API Base URL</p>
                      <p className='mt-2 break-all text-sm font-medium text-white sm:text-base'>
                        {endpointAddress}
                      </p>
                    </div>
                    <button
                      type='button'
                      onClick={handleCopyBaseURL}
                      className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#090909] text-zinc-200 transition-colors duration-200 hover:border-orange-400/40 hover:text-orange-200'
                    >
                      <Copy className='h-4 w-4' />
                    </button>
                  </div>
                  <div className='mt-4 flex flex-wrap gap-2'>
                    <span className='rounded-full border border-white/8 bg-[#090909] px-3 py-1 text-xs text-zinc-300'>
                      统一出口
                    </span>
                    <span className='rounded-full border border-white/8 bg-[#090909] px-3 py-1 text-xs text-zinc-300'>
                      兼容接入
                    </span>
                    <span className='rounded-full border border-white/8 bg-[#090909] px-3 py-1 text-xs text-zinc-300'>
                      一键复制
                    </span>
                  </div>
                </div>

                <div className='mt-5 grid gap-4 sm:grid-cols-2'>
                  <div className='rounded-[24px] border border-white/8 bg-[#101012] p-5'>
                    <div className='flex items-center gap-3 text-orange-200'>
                      <Sparkles className='h-5 w-5' />
                      <span className='text-sm font-medium'>Pool Health</span>
                    </div>
                    <div className='mt-4 text-3xl font-semibold text-white'>
                      98.7%
                    </div>
                    <p className='mt-2 text-sm text-zinc-400'>
                      路由熔断、自动切换与状态感知组合运行。
                    </p>
                  </div>
                  <div className='rounded-[24px] border border-white/8 bg-[#101012] p-5'>
                    <div className='flex items-center gap-3 text-orange-200'>
                      <Zap className='h-5 w-5' />
                      <span className='text-sm font-medium'>Routing Speed</span>
                    </div>
                    <div className='mt-4 text-3xl font-semibold text-white'>
                      Fast
                    </div>
                    <p className='mt-2 text-sm text-zinc-400'>
                      只保留挂首页该有的信息密度，不再堆整站文案。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='grid gap-4 md:grid-cols-3'>
          {capabilityItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className='rounded-[28px] border border-white/10 bg-[#0d0d0f] p-6'
              >
                <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/12 text-orange-300'>
                  <Icon className='h-5 w-5' />
                </div>
                <h3 className='mt-5 text-lg font-semibold text-white'>
                  {item.title}
                </h3>
                <p className='mt-2 text-sm leading-7 text-zinc-400'>
                  {item.description}
                </p>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default CodeHomePage;
