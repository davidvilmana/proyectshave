import React from "react";

export default function SplashScreen() {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-[#004aad]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 3387 3387"
                className="w-40 shave-splash-logo  animate-logo"
            >
                <path
                    fill="white"
                    d="M1890 1276c4,-23 7,-47 8,-70 -96,-25 -159,-118 -144,-218 16,-107 116,-181 223,-165 107,16 181,115 165,222 -12,83 -74,146 -151,163 47,98 65,211 45,327 -33,186 -158,334 -320,403l-3 1c-162,70 -284,223 -316,409 -13,75 -10,149 6,218 -121,-120 -184,-295 -152,-477 32,-186 157,-333 318,-402l6 -3c161,-69 282,-222 315,-408zm884 578c88,-597 -324,-1152 -920,-1241 -597,-89 -1152,323 -1241,920 -89,596 323,1152 920,1241 596,88 1152,-324 1241,-920z"
                />
            </svg>
        </div>
    );
}