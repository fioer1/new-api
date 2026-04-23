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
  Activity,
  ArrowRight,
  BadgeCheck,
  Bot,
  Copy,
  Gauge,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { copy, showSuccess } from '../../helpers';
import { useTranslation } from 'react-i18next';

const metricItems = [
  { label: '路由策略', value: 'Smart Pooling' },
  { label: '健康监测', value: '24/7' },
  { label: '接入协议', value: 'OpenAI API' },
];

const capabilityItems = [
  {
    icon: ShieldCheck,
    title: '稳定优先',
    description: '多账号分层调度与可用性优先策略，尽量把失败留在系统内部。',
  },
  {
    icon: Network,
    title: '统一号池',
    description: '把账号、渠道、模型入口收敛到一个面板里，减少来回切换。',
  },
  {
    icon: Gauge,
    title: '速度可感知',
    description: '核心状态、耗时与切换策略直接可见，问题更容易定位。',
  },
];

const scenarioItems = [
  {
    icon: Bot,
    title: '面向 ToC 产品',
    description: '适合聊天、创作、工具型前台应用，优先保证调用体验稳定。',
  },
  {
    icon: Server,
    title: '自建工作流',
    description: '统一入口接不同模型与账号池，给脚本、自动化和机器人使用。',
  },
  {
    icon: Sparkles,
    title: '轻运营后台',
    description: '保留系统原有控制台、定价和文档体系，只升级首页品牌观感。',
  },
];

const endpointHighlights = [
  '统一入口',
  '黑橙主题',
  '账号池调度',
  '低打扰导航',
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
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,142,42,0.2),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(255,119,0,0.16),transparent_22%),linear-gradient(180deg,#0a0a0b_0%,#050505_48%,#0a0a0a_100%)]' />
      <div className='absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px]' />
      <div className='absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/65 to-transparent' />

      <div className='relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pt-24'>
        <section className='grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_460px] lg:items-center'>
          <div>
            <div className='inline-flex items-center gap-3 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-200'>
              <BadgeCheck className='h-4 w-4' />
              {systemName}
            </div>

            <div className='mt-7 max-w-4xl'>
              <h1 className='max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl'>
                像云雾一样顺滑，
                <br />
                像主控台一样稳定。
              </h1>
              <p className='mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg'>
                {systemName}
                以统一号池为核心，把模型接入、账号轮询、状态感知和入口分发收拢到一个首页之下。
                你不需要再解释系统怎么跑，只需要让用户一眼看懂它很稳。
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
                to='/pricing'
                className='inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-medium text-white/92 transition-colors duration-200 hover:border-orange-400/40 hover:bg-white/10'
              >
                查看套餐
              </Link>
              {docsLink && (
                <a
                  href={docsLink}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center gap-2 rounded-full px-2 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:text-orange-200'
                >
                  文档入口
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
              {capabilityItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className='rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur'
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
            </div>
          </div>

          <div className='relative'>
            <div className='absolute -right-8 top-10 h-28 w-28 rounded-full bg-orange-500/20 blur-3xl' />
            <div className='relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0b0b0d]/90 p-6 shadow-[0_32px_120px_rgba(0,0,0,0.45)]'>
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,145,53,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_40%)]' />
              <div className='relative'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-xs uppercase tracking-[0.28em] text-zinc-500'>
                      Live Overview
                    </p>
                    <h2 className='mt-3 text-2xl font-semibold text-white'>
                      {systemName}
                    </h2>
                  </div>
                  <div className='rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-200'>
                    {version || 'home-page'}
                  </div>
                </div>

                <div className='mt-8 rounded-[28px] border border-white/8 bg-black/40 p-5'>
                  <div className='flex items-center justify-between gap-4'>
                    <div>
                      <p className='text-sm text-zinc-400'>品牌识别</p>
                      <p className='mt-2 text-xl font-semibold text-white'>
                        {systemName}
                      </p>
                    </div>
                    <div className='flex h-24 w-24 items-center justify-center rounded-[26px] border border-white/10 bg-white/5 p-4 shadow-[0_0_80px_rgba(255,122,0,0.18)]'>
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

                <div className='mt-5 rounded-[28px] border border-white/8 bg-white/[0.04] p-5'>
                  <div className='flex items-center justify-between gap-3'>
                    <div>
                      <p className='text-sm text-zinc-400'>接入地址</p>
                      <p className='mt-2 break-all text-sm font-medium text-white sm:text-base'>
                        {endpointAddress}
                      </p>
                    </div>
                    <button
                      type='button'
                      onClick={handleCopyBaseURL}
                      className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-zinc-200 transition-colors duration-200 hover:border-orange-400/40 hover:text-orange-200'
                    >
                      <Copy className='h-4 w-4' />
                    </button>
                  </div>
                </div>

                <div className='mt-5 grid gap-4 sm:grid-cols-2'>
                  <div className='rounded-[24px] border border-white/8 bg-white/[0.04] p-5'>
                    <div className='flex items-center gap-3 text-orange-200'>
                      <Activity className='h-5 w-5' />
                      <span className='text-sm font-medium'>Pool Health</span>
                    </div>
                    <div className='mt-4 text-3xl font-semibold text-white'>
                      98.7%
                    </div>
                    <p className='mt-2 text-sm text-zinc-400'>
                      路由熔断、自动切换与状态感知组合运行。
                    </p>
                  </div>
                  <div className='rounded-[24px] border border-white/8 bg-white/[0.04] p-5'>
                    <div className='flex items-center gap-3 text-orange-200'>
                      <Sparkles className='h-5 w-5' />
                      <span className='text-sm font-medium'>Dispatch Mode</span>
                    </div>
                    <div className='mt-4 text-3xl font-semibold text-white'>
                      Adaptive
                    </div>
                    <p className='mt-2 text-sm text-zinc-400'>
                      让首页表达系统价值，而不是堆一页说明书。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='mt-24 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 lg:p-10'>
          <div className='grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-center'>
            <div>
              <p className='text-xs uppercase tracking-[0.28em] text-orange-200'>
                Why This Version
              </p>
              <h2 className='mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl'>
                不是重做整个站，
                <br />
                而是把首页改到位。
              </h2>
              <p className='mt-5 max-w-xl text-base leading-8 text-zinc-400'>
                保留镜像自带导航、后台和设置结构，只替换首页主体气质。这样上线成本更低，后续维护也更简单。
              </p>
            </div>

            <div className='grid gap-4 md:grid-cols-3'>
              {scenarioItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className='rounded-[24px] border border-white/10 bg-black/25 p-5'
                  >
                    <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/12 text-orange-200'>
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CodeHomePage;
