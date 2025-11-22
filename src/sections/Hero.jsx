/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Spline from "@splinetool/react-spline";
// import Target from "../components/Target.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import Cube from "../components/Cube.jsx";
import Rings from "../components/Rings.jsx";
import Button from "../components/Button.jsx";
import { calculateSizes } from "../constants/index.js";

const Hero = () => {
    const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem("theme") !== "light");
    const [modelLoading, setModelLoading] = useState(true);

    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 786 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const sizes = calculateSizes(isSmall, isMobile, isTablet);

    // Theme sync
    useEffect(() => {
        const handleStorageChange = () => {
            const theme = localStorage.getItem("theme");
            setDarkTheme(theme !== "light");
        };

        window.addEventListener("storage", handleStorageChange);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    const isDark = document.documentElement.classList.contains("dark");
                    setDarkTheme(isDark);
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            observer.disconnect();
        };
    }, []);

    // const toggleTheme = () => {
    //     const newTheme = darkTheme ? "light" : "dark";
    //     localStorage.setItem("theme", newTheme);
    //     document.documentElement.classList.toggle("dark", newTheme === "dark");
    //     setDarkTheme(newTheme === "dark");
    // };

    const handleModelLoad = () => {
        setModelLoading(false);
    };

    return (
        <section
            className={`min-h-screen w-full flex flex-col relative transition-colors duration-500 ${darkTheme ? "bg-black" : "bg-gradient-to-b from-[#faedcd] to-[#f9dcc4] text-black"
                }`}
            id="home"
        >
            <div className="w-full mx-auto flex flex-col sm:mt-36 c-space mt-14 gap-3">
                <p
                    className={`sm:text-3xl text-2xl font-medium text-center fornt-genralsans ${darkTheme ? "text-white" : "text-black"
                        }`}
                >
                    Hi, I am Bhoomika <span className="waving-hand">👋</span>
                </p>
                <p
                    className={`hero_tag text-center ${darkTheme ? "text-gray-300" : "text-neutral-700"
                        }`}
                >
                    Software Developer and Student
                </p>
            </div>

            {/* Spline 3D Model */}
            <div className="absolute inset-0 flex justify-center items-center z-20 pointer-events-auto">
                {modelLoading && (
                    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                        <div
                            className={`${isSmall ? "w-12 h-12 border-3" : "w-16 h-16 border-4"
                                } border-t-4 ${darkTheme ? "border-gray-800 border-t-blue-500" : "border-gray-200 border-t-blue-600"
                                } rounded-full animate-spin`}
                        ></div>
                        <p
                            className={`mt-4 font-medium text-center ${isSmall ? "text-sm" : "text-base"
                                } ${darkTheme ? "text-gray-300" : "text-gray-700"}`}
                        >
                            Loading 3D Model...
                        </p>
                    </div>
                )}

                <Spline
                    scene="https://draft.spline.design/Ln0E2BXuZkkOuhxz/scene.splinecode"
                    style={{
                        transform: `scale(${isSmall ? 0.42 : isMobile ? 0.52 : 0.65})`,
                    }}
                    onLoad={handleModelLoad}
                />
            </div>

            {/* 3D Canvas Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none flex justify-center items-center">
                <div className="w-screen h-screen">
                    <Canvas
                        camera={{
                            position: [0, 2, 10],
                            fov: isMobile ? 60 : 50,
                        }}
                        gl={{
                            antialias: !isMobile,
                            powerPreference: isMobile ? "low-power" : "high-performance",
                        }}
                    >
                        <ambientLight intensity={isMobile ? 0.8 : 1} />
                        <directionalLight position={[0, 5, 5]} intensity={isMobile ? 1.2 : 1.5} />

                        <group>
                            {/* <Target position={sizes.targetPosition} /> */}
                            <ReactLogo position={sizes.reactLogoPosition} />
                            <Cube position={sizes.cubePosition} />
                            <Rings position={sizes.ringPosition} />
                        </group>

                        <OrbitControls
                            enableZoom={!isMobile}
                            enablePan={!isMobile}
                            enableRotate={!isSmall}
                            enableDamping={true}
                            dampingFactor={0.1}
                            maxPolarAngle={Math.PI / 2}
                        />
                    </Canvas>
                </div>
            </div>

            {/* Buttons */}
            <div
                className={`absolute left-0 right-0 flex justify-center z-30 ${isMobile ? "bottom-4 px-4 gap-3 flex-col items-center" : "bottom-2 px-8 gap-4 flex-wrap"
                    }`}
            >
                <a href="#contact" className={isMobile ? "w-full max-w-xs" : ""}>
                    <Button
                        isBeam
                        name="Let's work together"
                        className={`${isMobile ? "w-full px-6 py-3 text-sm" : "px-6 py-3"
                            } rounded-2xl font-semibold transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl`}
                    />
                </a>

                <a href="assets/Bhoomika_Resume.pdf" download className={isMobile ? "w-full max-w-xs" : ""}>
                    <Button
                        isBeam
                        name="Download Resume"
                        className={`${isMobile ? "w-full px-6 py-3 text-sm" : "px-6 py-3"
                            } rounded-2xl font-semibold transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl`}
                    />
                </a>
            </div>
        </section>
    );
};

export default Hero;
