import React, { useEffect, useState } from 'react';
import NftUpload from 'components/base/NftUpload';

import NftPreviewCard from './NftPreviewCard';

import style from './NftPreview.module.scss';

interface Props {
  className?: string;
  NFT: File | null;
  select: string;
  setError: (s: string) => void;
  setModalCreate: (b: boolean) => void;
  setNFT: (f: File | null) => void;
  secretNFT: File | null;
  setSecretNFT: (f: File | null) => void;
  setSelect: (s: string) => void;
}

const NftsTypes = ['Default', 'Protect', 'Secret', 'Blur'];

const NftPreview = ({
  className,
  NFT,
  select,
  setError,
  setModalCreate,
  setNFT,
  secretNFT,
  setSecretNFT,
  setSelect,
}: Props) => {
  const [isRN, setIsRN] = useState(false);

  useEffect(() => {
    setIsRN(window.isRNApp);
  }, []);

  if (secretNFT === null) {
    return (
      <NftUpload
        className={className}
        description="Click here to upload your file."
        isRN={isRN}
        note={`JPEG, JPG, PNG, GIF{${!isRN ? ', MP4 or MOV' : ''}}. Max 30mb.`}
        select={select}
        setError={setError}
        setModalCreate={setModalCreate}
        setSecretNFT={setSecretNFT}
        setSelect={setSelect}
      />
    );
  }

  return (
    <fieldset className={`${className ?? ''} ${style.NftPreviewWrapper}`}>
      {NftsTypes.map((type, id) => (
        <NftPreviewCard
          key={id}
          isSelected={select === type}
          NFT={NFT}
          secretNFT={secretNFT}
          setError={setError}
          setModalCreate={setModalCreate}
          setNFT={setNFT}
          setSelect={setSelect}
          type={type}
        />
      ))}
    </fieldset>
  );
};

export default NftPreview;
