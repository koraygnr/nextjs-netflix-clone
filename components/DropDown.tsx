import React from 'react';

interface MenuItem {
  name: string;
  icon?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
  href?: string;
}

interface IDropDown {
  menuList: MenuItem[];
}

function DropDown({ menuList }: IDropDown) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='absolute flex items-center justify-center w-44 h-auto top-12 right-0 p-2 bg-[#141414] drop-shadow-lg before:absolute before:-top-2 before:right-2 before:content-[""] before:border-l-8 before:border-l-transparent before:border-r-transparent before:border-r-8 before:border-b-8 before:border-b-[#141414]'
    >
      <ul>
        {menuList.map((menuItem, i) => (
          <li
            key={i}
            className='flex items-center gap-3 py-3 hover:underline cursor-pointer'
            onClick={menuItem.onClick}
          >
            <span className='text-2xl'>{menuItem.icon}</span>
            <span>{menuItem.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropDown;
