import React, { useState } from "react";
import { ReactComponent as IconClose } from "../svg/icon-close.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LinksType } from "./PageTwo";

interface Props {
  long: string;
  short: string;
  linkArray: LinksType[];
  setLinkArray: React.Dispatch<React.SetStateAction<LinksType[]>>;
  item: LinksType;
}

const Links: React.FC<Props> = ({
  long,
  short,
  linkArray,
  setLinkArray,
  item,
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-white w-3/4 rounded-lg mb-4 lg:flex lg:justify-between lg:items-center lg:p-4">
      <div className="flex justify-between border-b border-b-gray-300 p-4 lg:p-0 lg:border-none">
        <p className="text-sm lg:text-base">
          {long.length <= 40 ? long : long.slice(0, 50) + "..."}
        </p>
        <IconClose
          className="cursor-pointer lg:hidden active:scale-105"
          onClick={() => {
            setLinkArray(linkArray.filter((i) => i !== item));
          }}
        />
      </div>

      <div className="p-4 lg:w-2/5 lg:flex lg:p-0 lg:items-center lg:justify-between w-">
        <p className="text-teal-400 mb-4 lg:mb-0 lg:mr-">{short}</p>
        <CopyToClipboard
          text={short}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 5000);
          }}
        >
          <button
            key={new Date().getTime()}
            className={`${
              !copied
                ? `bg-teal-400`
                : `bg-purple-900 cursor-not-allowed hover:bg-purple-900`
            } w-full  text-white cursor-pointer py-2 rounded font-bold lg:mr- hover:bg-teal-300 lg:px-6 lg:w-auto`}
          >
            {!copied ? "Copy" : "Copied!"}
          </button>
        </CopyToClipboard>
        <IconClose
          className="cursor-pointer hidden lg:block"
          onClick={() => {
            setLinkArray(linkArray.filter((i) => i !== item));
          }}
        />
      </div>
    </div>
  );
};

export default Links;
