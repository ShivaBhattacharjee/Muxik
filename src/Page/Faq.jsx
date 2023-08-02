import React, { useState } from "react";
import { TECollapse } from "tw-elements-react";

export default function Faq(){
  const [activeElement, setActiveElement] = useState("");

  const handleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };
  return (
    <div className="bg-[#2d1b69] pl-10 pr-4 max-md:pl-4 overflow-y-hidden pb-24 h-screen">
      <div className=" text-white ">
        <div className=" rounded-lg mt-7">
          <h2 className="mb-0" id="headingOne">
            <button
              className={`${
                activeElement === "element1" &&
                `text-primary`
              } group relative flex w-full items-center rounded-t-[15px] bg-[#1b103f] px-5 py-4 text-left rounded-lg h-18`}
              type="button"
              onClick={() => handleClick("element1")}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              What is Muxik?
              <span
                className={`${
                  activeElement === "element1"
                    ? `rotate-[-180deg] -mr-1`
                    : `rotate-0 dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse
            show={activeElement === "element1"}
            className="!mt-0 !rounded-b-none !shadow-none"
          >
            <div className="px-5 py-4 bg-[#1b103f] rounded-b-lg">
              Muxik is a free open source music streaming/downloading platform to stream and download songs
              without any paywall.
              </div>
          </TECollapse>
        </div>


        <div className=" rounded-lg mt-7">
          <h2 className="mb-0" id="headingTwo">
            <button
              className={`${
                activeElement === "element2" &&
                `text-primary`
              } group relative flex w-full items-center rounded-t-[15px] bg-[#1b103f] px-5 py-4 text-left rounded-lg`}
              type="button"
              onClick={() => handleClick("element2")}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Muxik api and where does it store data?
              <span
                className={`${
                  activeElement === "element2"
                    ? `rotate-[-180deg] -mr-1`
                    : `rotate-0 dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse
            show={activeElement === "element2"}
            className="!mt-0 !rounded-b-none !shadow-none"
          >
            <div className="px-5 py-4 bg-[#1b103f] rounded-b-lg">
              Muxik uses an unofficial jio saavan scrapper to list and stream songs <br/>
              Link : <a href="https://github.com/sumitkolhe/jiosaavn-api" target="_blank" className=" border-b-2 text-blue-300">https://github.com/sumitkolhe/jiosaavn-api</a>
              </div>
          </TECollapse>
        </div>


        <div className=" rounded-lg mt-7">
          <h2 className="mb-0" id="headingThree">
            <button
              className={`${
                activeElement === "element3" &&
                `text-primary`
              } group relative flex w-full items-center rounded-t-[15px] bg-[#1b103f] px-5 py-4 text-left rounded-lg`}
              type="button"
              onClick={() => handleClick("element3")}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Muxik Source Code?
              <span
                className={`${
                  activeElement === "element3"
                    ? `rotate-[-180deg] -mr-1`
                    : `rotate-0 dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse
            show={activeElement === "element3"}
            className="!mt-0 !rounded-b-none !shadow-none !pb-3"
          >
            <div className="px-5 py-4 bg-[#1b103f] rounded-b-lg ">
                Frontend : <br />
                <a href="https://github.com/ShivaBhattacharjee/Muxik" target="_blank" className=" border-b-2 text-blue-300 max-w-xs break-words">https://github.com/ShivaBhattacharjee/Muxik</a>
                <br />
                Backend:
                <br />
                <a href="https://github.com/ShivaBhattacharjee/Muxik-backend" target="_blank" className=" border-b-2 text-blue-300 break-words">https://github.com/ShivaBhattacharjee/Muxik-backend</a> 
                <br />
              </div>
          </TECollapse>
        </div>

        <div className=" rounded-lg mt-7">
          <h2 className="mb-0" id="headingFour">
            <button
              className={`${
                activeElement === "element4" &&
                `text-primary`
              } group relative flex w-full items-center rounded-t-[15px] bg-[#1b103f] px-5 py-4 text-left rounded-lg`}
              type="button"
              onClick={() => handleClick("element4")}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Disclaimer
              <span
                className={`${
                  activeElement === "element4"
                    ? `rotate-[-180deg] -mr-1`
                    : `rotate-0 dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse
            show={activeElement === "element4"}
            className="!mt-0 !rounded-b-none !shadow-none"
          >
            <div className="px-5 py-4 bg-[#1b103f] rounded-b-lg">
            Muxik is not affiliated with or endorsed by any of the music studios behind the creation of the music presented on this site. This website is only an user interface presenting/linking various self-hosted files across the internet by other third-party providers for easy access. Muxik never downloads the video from any source provider, link will be returned from the response hence it is completely not subjected to DMCA compliant.
              </div>
          </TECollapse>
        </div>
      </div>
    </div>
  );
}