import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as BrandRecognition } from "../svg/icon-brand-recognition.svg";
import { ReactComponent as FullyCutomizable } from "../svg/icon-fully-customizable.svg";
import { ReactComponent as DetailedRecords } from "../svg/icon-detailed-records.svg";
import BoostDesktop from "../svg/bg-boost-desktop.svg";
import ShortenDesktop from "../svg/bg-shorten-desktop.svg";
// import { app } from "../utils";
import axios from "axios";
import Links from "./Links";
import ReactLoading from "react-loading";

interface Props {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LinksType {
  longLink: string;
  shortLink: string;
}

const PageTwo: React.FC<Props> = ({ clicked, setClicked }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [link, setLink] = useState("");

  const [error, setError] = useState("");

  const [linkArray, setLinkArray] = useState<LinksType[]>([]);

  const [loading, setLoading] = useState(false);

  const getShortenedLink = async () => {
    //eslint-disable-next-line
    const data = await axios
      .post(`https://api.shrtco.de/v2/shorten?url=${link}`)
      .then((response) => {
        console.log(response.data.result.short_link);
        setLinkArray([
          ...linkArray,
          {
            longLink: link,
            shortLink: response.data.result.short_link,
          },
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.response.data);
        setLoading(false);

        if (error.code === "ERR_NETWORK") {
          setError("An error occured. Please try again");
          setTimeout(() => {
            setError("");
          }, 3000);
        }

        if (error.response.data.error_code === 10) {
          setError("This is a disallowed URL!");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  };

  useEffect(() => {
    const array = localStorage.getItem("link-array");
    array && setLinkArray(JSON.parse(array));
  }, []);

  useEffect(() => {
    localStorage.setItem("link-array", JSON.stringify(linkArray));
  });

  if (clicked && null !== inputRef.current) {
    inputRef.current.focus();
  }

  return (
    <div className="pageTwo">
      <div className="pageTwo-container bg-gray-200 flex flex-col items-center">
        <div className="flex justify-center items-center w-full flex-col relative -mt-20 md:-mt-14 lg:-mt-20">
          <form
            className="url-container w-3/4 flex flex-col justify-between p-7 rounded-xl bg-cover mb-4 md:flex-row md:items-start lg:py-10 lg:px-16"
            style={{ backgroundImage: `url(${ShortenDesktop})` }}
            onSubmit={(e) => {
              e.preventDefault();

              if (
                null !== inputRef.current &&
                inputRef.current?.value.length === 0
              ) {
                setError("Please provide a url...");
                setTimeout(() => {
                  setError("");
                }, 3000);
              } else {
                if (null !== inputRef.current) {
                  inputRef.current.value = "";
                }

                if (
                  linkArray.filter((obj) => obj.longLink === link).length !== 0
                ) {
                  setLinkArray([...linkArray]);
                  document.getElementById("duplicate")!.innerHTML =
                    "URL has already been shortened!";

                  setTimeout(() => {
                    document.getElementById("duplicate")!.innerHTML = "";
                  }, 2000);
                } else {
                  setLoading(true);
                  getShortenedLink();

                  // setLinkArray([
                  //   ...linkArray,
                  //   {
                  //     longLink: link,
                  //     shortLink: app.shorten(link),
                  //   },
                  // ]);
                }
                setClicked(false);
              }
            }}
          >
            <div className="mb-4 lg:mb-0 md:w-2/3 lg:w-3/4">
              <input
                ref={inputRef}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                type="url"
                placeholder="Shorten a link here..."
                className="w-full px-3 py-2 rounded-lg mb-2 md:py-4 focus:outline-red-400 focus:placeholder:text-red-300"
              />
              {<p className="lg:mb-0 text-red-400 italic">{error}</p>}
              {<p id="duplicate" className="lg:mb-0 text-red-400 italic"></p>}
            </div>

            <button
              className={`flex justify-center items-center bg-teal-400 text-white cursor-pointer rounded-lg py-2 md:w-36 md:h-14 md:font-bold hover:bg-teal-300 transition-all active:scale-105`}
              type="submit"
            >
              {loading ? (
                <ReactLoading
                  color="white"
                  type="spin"
                  width={"32px"}
                  height={"32px"}
                />
              ) : (
                "Shorten it!"
              )}
            </button>
          </form>

          {linkArray?.map((item) => (
            <Links
              long={item.longLink}
              short={item.shortLink}
              linkArray={linkArray}
              setLinkArray={setLinkArray}
              item={item}
              // key={new Date().getTime()}
            />
          ))}
        </div>

        <div className="pageTwo-container pb-20 pt-40 px-8 lg:w-3/4 lg:px-0 lg:pt-48">
          <div className="lg:flex lg:justify-center lg:items-center">
            <div className="text-center mb-16 xl:w-2/5">
              <p className="text-gray-800 text-2xl font-bold mb-4 md:text-4xl">
                Advanced Statistics
              </p>
              <p className="text-gray-400 tracking-wide leading-relaxed lg:mb-8">
                Track how your links are performing across the web with our
                advanced statistics dashboard
              </p>
            </div>
          </div>

          <div className="stats-container flex flex-col justify-center items-center w-full xl:flex-row xl:justify-between">
            <div className="stats bg-white text-center flex flex-col justify-center items-center px-4 pb-8 rounded-lg sm:w-1/2 xl:text-left xl:items-start xl:px-8">
              <div className="icon-container p-4 rounded-full -mt-8 mb-8">
                <BrandRecognition />
              </div>
              <p className="text-gray-800 text-2xl font-bold mb-4">
                Brand Recognition
              </p>
              <p className="text-gray-400 tracking-wide leading-relaxed">
                Boost your brand recognition with each click. Generic links
                don't mean a thing Branded links help instill confidence in your
                content.
              </p>
            </div>

            <div className="line bg-teal-400 h-20 w-2 xl:h-2"></div>

            <div className="stats bg-white text-center flex flex-col justify-center items-center px-4 pb-8 rounded-lg sm:w-1/2 xl:text-left xl:items-start xl:px-8 xl:-mb-20">
              <div className="icon-container p-4 rounded-full -mt-8 mb-8">
                <DetailedRecords />
              </div>
              <p className="text-gray-800 text-2xl font-bold mb-4">
                Detailed Records
              </p>
              <p className="text-gray-400 tracking-wide leading-relaxed">
                Gain insights into who is clicking your links. Knowing when and
                where people engage with your content helps inform better
                decisions.
              </p>
            </div>

            <div className="line bg-teal-400 h-20 w-2 xl:h-2"></div>

            <div className="stats bg-white text-center flex flex-col justify-center items-center px-4 pb-8 rounded-lg sm:w-1/2 xl:text-left xl:items-start xl:px-8 xl:-mb-40">
              <div className="icon-container p-4 rounded-full -mt-8 mb-8">
                <FullyCutomizable />
              </div>
              <p className="text-gray-800 text-2xl font-bold mb-4">
                Fully Customizable
              </p>
              <p className="text-gray-400 tracking-wide leading-relaxed">
                Improve brand awareness and content discoverablility through
                customizable links, supercharging audience engagement.
              </p>
            </div>
          </div>
        </div>

        <div
          className="mobile-boost flex flex-col justify-center items-center py-16 bg-cover w-full md:py-20 xl:mt-28"
          style={{ backgroundImage: `url(${BoostDesktop})` }}
        >
          <p className="text-white text-xl font-bold mb-4 md:text-4xl md:mb-8">
            Boost your links today
          </p>
          <button
            className="text-white bg-teal-400 rounded-full px-10 py-3 font-bold md:py-4 hover:bg-teal-300 transition-all"
            onClick={() => {
              setClicked(true);
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageTwo;
