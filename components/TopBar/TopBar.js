import Link from "next/link";
import LanguageSelector from "../LanguageSelector/LanguageSelector.js"
import Translated from "../../context/state";
import Translate from "../Translate";
import classes from "../LanguageSelector/LanguageSelector.module.css";

const TopBar = () => {
  return (
    <div className=" bg-croonus-2 py-2 max-lg:hidden">
      <div className="mx-auto flex flex-row justify-between max-2xl:w-full max-2xl:px-6 w-[90%] items-center">
        <div className="text-xs text-croonus-1 max-lg:flex max-lg:justify-between">
          <span className="ml-2 text-[1rem] font-medium text-croonus-1">
          <Translated Key="work" />: 08 - 16h
          </span>
        </div>
       
        <div className="text-[1rem] font-medium text-croonus-1 lg:block ml-6">
          {/* <span className="mr-3">Pratite nas: </span>
          <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f text-black text-basic mr-2" /></Link>
          <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-instagram text-black text-basic"></i>
          </Link> */}
          {/* <LanguageSelector options={["English", "Srpski", "Српски"]} /> */}
          <div className="flex">
          <Translate />
            <span className={classes["globe-span"] + " button-span-2 bs2-40"}>
                <img src={"/icons/globe.png"} alt="earth" />
              </span>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TopBar;
