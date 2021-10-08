import { FC } from "react";
import IconState from "../IconType/IconType";
import CloseIcon from "../../static/close.svg";
import MainImagePokemon from "../MainImagePokemon/MainImagePokemon";
import fixNumber from "./../../utils/fixNumber";
import { motion } from "framer-motion";

import "./img-pokemon.css";

export type Props = {
  data: any;
  onClickHandler: any;
  onCloseHandler: any;
  bounding: {
    top: number;
    right: number;
    width: number;
    height: number;
  };
  size: {
    width: number;
  };
};

const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] };

const ImgPokemon: FC<Props> = ({
  data,
  onClickHandler,
  onCloseHandler,
  bounding,
  size,
}) => {
  console.log(!bounding ? "emtrp" : "no");
  const hanglerBackPokemon = (id: number) => {
    let backPokemon = id - 1;
    onClickHandler(backPokemon);
  };

  const hanglerNextPokemon = (id: number) => {
    let nextPokemon = id + 1;
    onClickHandler(nextPokemon);
  };

  return (
    <>
      <motion.div
        className="img-pokemon"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1, ...transition } }}
      >
        <div className="pokemon-element-icon">
          <div>
            {data &&
              data.type.map((el: string) => <IconState key={el} state={el} />)}
          </div>
          <img
            src={CloseIcon}
            alt=""
            className="close-pokemon"
            onClick={onCloseHandler}
          />
        </div>
        <div className="image-main">
          <MainImagePokemon img={data && data.mainImage} />
        </div>
        <div className="numb-arrow">
          <p className="arrow" onClick={() => hanglerBackPokemon(data.id)}>
            {"< back"}
          </p>
          <p className="number">{`#${data ? fixNumber(data.id) : "---"}`}</p>
          <p className="arrow" onClick={() => hanglerNextPokemon(data.id)}>
            {"next >"}
          </p>
        </div>
      </motion.div>
      {bounding ? (
        <motion.div
          className="transition-page"
          initial={{
            top: bounding.top,
            right: window.innerWidth - bounding.right,
            width: bounding.width,
            height: bounding.height,
            rotateY: "180deg",
            rotateX: 20,
            opacity: 0.8,
          }}
          animate={{
            top: 0,
            right: 0,
            width:
              window.innerWidth > 1440 ? "calc(45% - 1em)" : "calc(50% - 1em)",
            height: "100%",
            rotateY: 0,
            rotateX: 0,
            opacity: 1,
            transition: transition,
          }}
        />
      ) : (
        <div className="transition-page no-animated"></div>
      )}
    </>
  );
};

export default ImgPokemon;
