import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactComponent as BrandRecognition } from "../svg/icon-brand-recognition.svg";
import { ReactComponent as FullyCutomizable } from "../svg/icon-fully-customizable.svg";
import { ReactComponent as DetailedRecords } from "../svg/icon-detailed-records.svg";
import BoostDesktop from "../svg/bg-boost-desktop.svg";
import ShortenDesktop from "../svg/bg-shorten-desktop.svg";
import axios from "axios";
import Links from "./Links";
import ReactLoading from "react-loading";
import { useQuery } from "@tanstack/react-query";

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

  const [errorMessage, setErrorMessage] = useState("");

  const [linkArray, setLinkArray] = useState<LinksType[]>([]);

  const [disabled, setDisabled] = useState(true);

  const getShortenedLink = () =>
    axios
      .get(`https://api.shrtco.de/v2/shorten?url=${link}`, { timeout: 10000 })
      .then((response) => response.data.result.short_link)
      .then((data) => {
        updateLinkArray(link, data);
        return data;
      });

  const updateLinkArray = (long: string, short: string) => {
    setLinkArray([
      ...linkArray,
      {
        longLink: long,
        shortLink: short,
      },
    ]);
  };

  const { isFetching, error, refetch } = useQuery<string, any>(
    ["link"],
    getShortenedLink,
    {
      enabled: false,
      retry: false,
      networkMode: "offlineFirst",
    }
  );

  const handleError = (error: string) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDisabled(true);

    // clear input field
    inputRef.current!.value = "";

    // check if link has already been shortened
    if (linkArray.filter((obj) => obj.longLink === link).length !== 0) {
      handleError("URL has already been shortened!");
    } else {
      refetch();
    }
    setClicked(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value.replace(/\s/g, ""));
  };

  const handlePaste = () => {
    setDisabled(false);
  };

  useEffect(() => {
    const array = localStorage.getItem("link-array");
    array && setLinkArray(JSON.parse(array));
  }, []);

  useEffect(() => {
    localStorage.setItem("link-array", JSON.stringify(linkArray));
  }, [linkArray]);

  useEffect(() => {
    if (error) {
      if (error?.code === "ECONNABORTED") {
        handleError("Request timeout. Please try again");
      }
      if (error?.message === "Network Error") {
        handleError("Please check your connection and try again");
      }
      if (error.response.data?.error_code === 10) {
        handleError("This is a disallowed URL!");
      }
    }
  }, [error]);

  useEffect(() => {
    setDisabled(inputRef.current?.value.length === 0);
  }, [inputRef.current?.value]);

  useEffect(() => {
    clicked && inputRef.current!.focus();
  }, [clicked]);

  // begin here

  const addCredentials = { withCredentials: true };

  const userData = {
    username: "Kenny",
    password: "12345",
  };

  const login = () => {
    axios
      .post("http://localhost:8000/login", userData, addCredentials)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const myCookie = document.cookie
    .split("; ")
    .filter((row) => row.startsWith("jwt"))
    .map((c) => c.split("=")[1])[0];

  const refresh = () => {
    axios
      .get("http://localhost:8000/refresh")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  console.log("cookie ", myCookie);

  // end here

  return (
    <div className="pageTwo">
      <div className="pageTwo-container bg-gray-200 flex flex-col items-center">
        <div className="flex justify-center items-center w-full flex-col -mt-20 md:-mt-14 lg:-mt-20">
          <form
            className="url-container w-3/4 p-8 flex flex-col justify-center rounded-xl bg-cover mb-4 lg:py-10 lg:px-16"
            style={{ backgroundImage: `url(${ShortenDesktop})` }}
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-6 md:flex-row justify-between">
              <div className="lg:mb-0 md:w-2/3 lg:w-3/4">
                <input
                  ref={inputRef}
                  onChange={handleChange}
                  onPaste={handlePaste}
                  type="url"
                  placeholder="Shorten a link here..."
                  className="w-full px-3 py-2 rounded-lg md:py-4 focus:outline-red-400 focus:placeholder:text-red-300"
                />
              </div>

              <button
                disabled={disabled}
                className={`flex justify-center items-center bg-teal-400 text-white rounded-lg py-2 md:w-36 md:h-14 md:font-bold`.concat(
                  disabled
                    ? ` cursor-not-allowed opacity-70`
                    : `cursor-pointer hover:bg-teal-300 transition-all active:scale-105`
                )}
                type="submit"
              >
                {isFetching ? (
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
            </div>
            {<p className="lg:mb-0 text-red-400 text-sm">{errorMessage}</p>}
          </form>

          {linkArray?.map((item) => (
            <Links
              long={item.longLink}
              short={item.shortLink}
              linkArray={linkArray}
              setLinkArray={setLinkArray}
              item={item}
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
            {/* begin here */}
            <button onClick={login} className="text-red-900 cursor-pointer">
              Login
            </button>
            <button onClick={refresh} className="text-red-900 cursor-pointer">
              Refresh
            </button>
            {/* end here */}

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
