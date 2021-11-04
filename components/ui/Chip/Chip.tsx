import React from 'react';

import style from 'Chip.module.scss';

interface Props {
  className?: string;
  color: 'primary' | 'transparent';
  icon?: React.SVGProps<SVGSVGElement>;
  isDeletable?: boolean;
  onDelete?: () => void;
  size: 'small' | 'medium';
  text: string;
}

const Chip = ({
  className,
  color,
  icon,
  isDeletable = false,
  onDelete,
  text,
}: Props) => {
  return (
    <div
      className={`${className} ${style.root} ${[`style.root__${color}`]} ${
        isDeletable ? style.root__deletable : ''
      }`}
    >
      {icon}
      <span className={`${style.text} ${[`style.text__${color}`]}`}>
        {text}
      </span>
      {isDeletable && (
        <button className={style.deleteIcon} onClick={onDelete}>
          X
        </button>
      )}
    </div>
  );
};

export default Chip;
