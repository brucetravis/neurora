import React, { useState, useMemo, useEffect } from 'react';
import './Pricing.css';
import { useInView } from 'react-intersection-observer';
import { useSpring, useSprings, animated } from '@react-spring/web';

// -----------------------------
//  PRICING COMPONENT
// -----------------------------
export default function Pricing() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [currency, setCurrency] = useState('USD');

    const EUR_RATE = 0.92;
    const KES_RATE = 130;

    const format = (usd) => {
        if (currency === 'USD') return `$${usd.toLocaleString()}`;
        if (currency === 'EUR') return `€${Math.round(usd * EUR_RATE).toLocaleString()}`;
        return `KSh ${Math.round(usd * KES_RATE).toLocaleString()}`;
    };

    // -----------------------------
    //  MEMOIZED PLANS
    // -----------------------------
    const aiPlans = useMemo(() => [
        {
            id: 'ai-basic',
            name: 'Basic AI',
            usd: 1500,
            tag: '',
            features: [
                'Simple AI feature integration (chatbot, recommendation engine)',
                '1 AI model or workflow setup',
                'Basic hosting & security',
                'Email support for 30 days',
                'Free maintenance for up to 1 year'
            ],
        },
        {
            id: 'ai-standard',
            name: 'Standard AI',
            usd: 3000,
            tag: 'Best value',
            features: [
                'Advanced AI features (chatbot + analytics + predictions)',
                '2 AI models / workflows',
                'Hosting, monitoring & basic security',
                '1-week dedicated onboarding & training',
                'Email & chat support',
            ],
        },
        {
            id: 'ai-premium',
            name: 'Premium AI',
            usd: 4800,
            tag: '',
            features: [
                'Full-featured AI system tailored to business',
                '3 AI models / workflows',
                'Automated data pipelines & monitoring',
                'Dedicated onboarding & personalized support',
                '1-month post-deployment maintenance',
            ],
        },
        {
            id: 'ai-enterprise',
            name: 'Enterprise AI',
            usd: 6800,
            tag: 'Custom',
            features: [
                'Fully custom AI solution (multi-model, multi-system integration)',
                'High-performance hosting & advanced security',
                'Dedicated project manager & technical team',
                'Extended support & SLA',
            ],
        },
    ], []);

    const swPlans = useMemo(() => [
        {
            id: 'sw-basic',
            name: 'Basic',
            usd: 500,
            tag: '',
            features: [
                'Simple website or app setup',
                'Up to 5 pages/screens',
                'Basic hosting & security',
                'Email support for 2 weeks',
                'Free Maintenance for up to 6 months'
            ],
        },
        {
            id: 'sw-standard',
            name: 'Standard',
            usd: 1500,
            tag: '',
            features: [
                'Website or app with advanced features',
                'Up to 10 pages/screens',
                'Custom UI/UX design',
                'Hosting, basic security & maintenance',
                'Email & chat support for 1 month',
            ],
        },
        {
            id: 'sw-premium',
            name: 'Premium',
            usd: 3500,
            tag: 'Best value',
            features: [
                'Full-featured web/app system',
                'Up to 20 pages/screens',
                'Custom integrations & automation',
                'Hosting, monitoring & security',
                'Dedicated onboarding & training',
                '1-month post-launch support',
            ],
        },
        {
            id: 'sw-enterprise',
            name: 'Enterprise',
            usd: 7000,
            tag: 'Custom',
            features: [
                'Custom software solution (multi-system integration)',
                'Unlimited pages/screens & modules',
                'Advanced security & cloud hosting',
                'Dedicated project manager & technical team',
                'Extended support & service-level agreement (SLA)',
            ],
        },
    ], []);

    // spring animation for the section content
    const sectionSpring = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(50px)',
        config: { mass: 1, tension: 200, friction: 24 }
    })

    const extraDelay = 400; // extra delay in ms after AI cards

    // define cardSprings
    const [cardSprings, api] = useSprings(aiPlans.length, (i) => ({
        opacity: 0,
        x: i % 2 === 0 ? -30 : 30, // separate X offset
        y: 50, // separate Y offset
        config: { mass: 1, tension: 200, friction: 24 },
    }));

    // // trigger animation when inView becomes true
    // useEffect(() => {
    // if (inView) {
    //     api.start((i) => ({
    //     opacity: 1,
    //     x: 0,
    //     y: 0,
    //     delay: i * 100 + extraDelay
    //     }));
    // }
    // }, [inView, api]);

    const [swCardSprings, swApi] = useSprings(swPlans.length, (i) => ({
        opacity: 0,
        x: i % 2 === 0 ? -50 : 50, // left/right start
        y: 50,                      // start lower
        config: { mass: 1, tension: 200, friction: 24 },
    }));

    // useEffect(() => {
    //     if (inView) {
    //         swApi.start((i) => ({
    //         opacity: 1,
    //         x: 0,
    //         y: 0,
    //         delay: i * 100 + 200, // offset slightly after AI cards
    //         }));
    //     }
    // }, [inView, api, swApi]);

    useEffect(() => {
        if (inView) {
            api.start((i) => ({
            opacity: 1,
            x: 0,
            y: 0,
            delay: i * 100 + extraDelay,
            }));

            swApi.start((i) => ({
            opacity: 1,
            x: 0,
            y: 0,
            delay: i * 100 + 200,
            }));
        } else {
            // reset if needed
            api.set({ opacity: 0, x: -30, y: 50 });
            swApi.set({ opacity: 0, x: -50, y: 50 });
        }
    }, [inView, currency, api, swApi]);

    return (
        <section className="pricing-section" ref={ref}>
            <animated.div style={sectionSpring} className='pricing-inner'>
                <div className="pricing-inner">
                    <h4 className="pricing-kicker">Pricing Plans</h4>
                    <h2 className="pricing-heading">EXPLORE OUR AFFORDABLE PLANS</h2>

                    <div className="currency-toggle">
                    <div className="toggle-label">Currency</div>
                    <div className="toggle-buttons" role="tablist" aria-label="Currency switch">
                        {['USD', 'EUR', 'KES'].map((c) => (
                            <button
                                key={c}
                                className={`toggle-btn ${currency === c ? 'active' : ''}`}
                                onClick={() => setCurrency(c)}
                                aria-pressed={currency === c}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                    </div>
                </div>
            </animated.div>

                {/* AI Services */}
                <div className="section-block ai-block">
                    <div className="section-header">
                    <h3 className="section-title">AI Services</h3>
                    <p className="section-sub">AI websites, apps, and bespoke AI systems — designed for measurable ROI.</p>
                    </div>

                    <div className="cards-grid">
                        {aiPlans.map((plan, i) => (
                            <animated.article 
                                key={plan.id}
                                style={{
                                opacity: cardSprings[i].opacity,
                                transform: cardSprings[i].x.to((x) =>
                                    cardSprings[i].y.to((y) => `translateX(${x}px) translateY(${y}px)`)
                                ),
                                }}
                                className={`card card-ai ${plan.tag ? 'card-tagged' : ''}`}
                            >
                                {plan.tag && <div className="badge">{plan.tag}</div>}

                                {/* <div className="card-3d">
                                    {/* Placeholder for future 3D or animated content
                                    <div className="card-3d-placeholder"></div>
                                </div> */}

                                <div className="card-body">
                                    <h4 className="card-title">{plan.name}</h4>
                                    <div className="price">
                                    <span className="price-amount">{format(plan.usd)}</span>
                                    <span className="price-note">Starting from</span>
                                    </div>
                                    <ul className="features">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                    <div className="card-cta">
                                        <button className={`btn primary ${i === 1 ? 'btn-ghost' : ''}`}>Get started</button>
                                        <button className="btn subtle">Contact sales</button>
                                    </div>
                                </div>
                            </animated.article>
                        ))}
                    </div>
                </div>

                {/* Software Services */}
                <div className="section-block sw-block">
                    <div className="section-header">
                    <h3 className="section-title">Software (Websites • Apps • Systems)</h3>
                    <p className="section-sub">Reliable, maintainable products — no agents, just rock-solid engineering.</p>
                    </div>

                    <div className="cards-grid">
                    {swPlans.map((plan, i) => (
                        <animated.article 
                            key={plan.id}
                            style={{
                                opacity: swCardSprings[i].opacity,
                                transform: swCardSprings[i].x.to((x) =>
                                swCardSprings[i].y.to((y) => `translateX(${x}px) translateY(${y}px)`)
                                ),
                            }}
                            className={`card card-sw ${plan.tag ? 'card-tagged' : ''}`}
                        >
                        {plan.tag && <div className="badge">{plan.tag}</div>}

                        {/* <div className="card-3d small">
                            <div className="card-3d-placeholder"></div>
                        </div> */}

                        <div className="card-body">
                            <h4 className="card-title">{plan.name}</h4>
                            <div className="price">
                            <span className="price-amount">{format(plan.usd)}</span>
                            <span className="price-note">Starting from</span>
                            </div>
                            <ul className="features">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                            <div className="card-cta">
                                <button className="btn primary">Get started</button>
                                <button className="btn subtle">Request quote</button>
                            </div>
                        </div>
                        </animated.article>
                    ))}
                    </div>
                </div>
        </section>
    );
}
