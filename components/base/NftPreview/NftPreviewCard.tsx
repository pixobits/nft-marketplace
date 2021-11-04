import React from 'react';
import WhiteWaterMark from 'components/assets/WhiteWaterMark';
import NftUpload from 'components/base/NftUpload';

import style from './NftPreviewCard.module.scss';

interface Props {
  isSelected: boolean;
  NFT: File | null;
  secretNFT: File;
  setError: (s: string) => void;
  setModalCreate: (b: boolean) => void;
  setNFT: (f: File | null) => void;
  setSelect: (s: string) => void;
  type: string;
}

function returnType(NFTarg: File) {
  if (NFTarg!.type.substr(0, 5) === 'image') {
    return (
      <img
        className={style.IMGBackground}
        src={URL.createObjectURL(NFTarg)}
        alt="img"
        id="output"
      />
    );
  } else if (NFTarg!.type.substr(0, 5) === 'video') {
    return (
      <video
        autoPlay
        muted
        playsInline
        loop
        className={style.IMGBackground}
        key={NFTarg.name + NFTarg.lastModified}
      >
        <source id="outputVideo" src={URL.createObjectURL(NFTarg)} />
      </video>
    );
  }
}

const NftPreviewCard = ({
  isSelected = false,
  NFT,
  secretNFT,
  setError,
  setModalCreate,
  setNFT,
  setSelect,
  type,
}: Props) => {
  return (
    <>
      <label
        className={`${style.NftPreviewCard} ${
          isSelected ? style.NftPreviewCard__active : ''
        }`}
        htmlFor={`NftType_${type}`}
      >
        <div className={style.IMGWrapper}>
          {returnType(secretNFT)}
          {type === 'Blur' && <div className={style.Blur} />}
          {type === 'Protect' && (
            <div className={style.OPTN}>
              <div className={style.OPTNCTNR}>
                <WhiteWaterMark className={style.WaterMarkSVG} />
              </div>
            </div>
          )}
          {type === 'Secret' && (
            <div className={style.SecretWrapper}>
              {NFT === null ? (
                <NftUpload
                  className={style.SecretUpload}
                  description={
                    <div className={style.SecretUploadDescription}>
                      <span className={style.SecretUploadTopDescription}>
                        Drag your the preview of your secret.
                      </span>
                      <span>
                        Once purchased, the owner will be able to see your NFT
                      </span>
                    </div>
                  }
                  //isRN={isRN}
                  isSecretOption
                  note={`PNG, GIF, WEBP, MP4 or MP3. Max 30mb.`}
                  setError={setError}
                  setModalCreate={setModalCreate}
                  setSecretNFT={setNFT}
                  setSelect={setSelect}
                />
              ) : (
                returnType(NFT)
              )}
            </div>
          )}
        </div>

        <div className={style.NftTypeRadio}>
          <input
            type="radio"
            className={style.InputRadio}
            checked={isSelected}
          />
          <span className={style.NftTypeRadioLabel}>{type}</span>
        </div>
      </label>

      <div className={style.HiddenShell}>
        <input
          type="radio"
          id={`NftType_${type}`}
          className={style.HiddenInput}
          name={`NftType_${type}`}
          onClick={() => setSelect(type)}
          value={type}
        />
      </div>
    </>
  );
};

export default NftPreviewCard;
