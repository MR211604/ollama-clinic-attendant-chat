"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Greeting {
    text: string;
}

const greetings: Greeting[] = [
    { text: "Tengo molestias al respirar, ¿a quién debo acudir?" },
    { text: "¿Cuáles son los horarios de atención de la clínica?" },
    { text: "¿Se atienden urgencias médicas o solo consultas programadas?" },
    { text: "¿Cómo puedo solicitar mi historial médico?" },
    { text: "¿Cómo agendo una cita médica?" }
];

const DynamicText = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Animation variants for the text
    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
    };

    return (
        <div className="relative flex flex-col items-center justify-center overflow-x-clip">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    className="flex items-center text-sm font-medium text-gray-800/80 dark:text-gray-200"
                    aria-live="off"
                    initial={textVariants.hidden}
                    animate={textVariants.visible}
                    exit={textVariants.exit}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {greetings[currentIndex]?.text}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default DynamicText;
