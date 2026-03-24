"use client";

import React, { useState } from "react";
import { landingContent, type Language } from "@/data/landing-content"

export default function HipaaSection({ lang = "es" }: { lang?: "es" | "en" }) {
    
    const t = landingContent[lang]
    return (
        <section
            id="hipaa"
            className="bg-[#0C1018] text-[#EFF6FF] py-16 px-6 sm:px-12 lg:px-20">
            <div className="max-w-5xl mx-auto">
                {/* Encabezado */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-serif italic text-[#00D2AA] mb-4">
                        {t.hipaa.title}
                    </h2>
                    <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto">
                        {t.hipaa.intro}
                    </p>
                </div>

                {/* Tarjetas */}
                <div className="grid gap-8 sm:grid-cols-2">
                    {t.hipaa.cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-[#111827] border border-[#00D2AA]/30 rounded-xl p-6 shadow-lg"
                        >
                            <h3 className="text-xl font-semibold text-[#00D2AA] mb-3">
                                {card.title}
                            </h3>
                            <p className="text-[#CBD5E1] text-sm leading-relaxed">
                                {card.body}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                {/* <div className="text-center mt-12">
                    <button className="bg-[#00D2AA] text-[#06080B] font-semibold text-base rounded-xl px-6 py-3 cursor-pointer hover:scale-105 transition-transform">
                        {t.hipaa.cta}
                    </button>
                </div> */}
            </div>
        </section>
    );
}
