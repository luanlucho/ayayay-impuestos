import React from "react";
import { twMerge } from "tailwind-merge";

import GoToNewButton from "./GoToNewButton/GoToNewButton";
import { PageHeaderProps as Props } from "./PageHeader.types";
import GoBack from "../GoBack/GoBack";

const PageHeader = (props: Props) => {
  const { className, childrenLeft, childrenRight, title, withGoBack } = props;
  const { titleClassName } = props;
  const columnClassName = "flex items-center gap-4";

  return (
    <header
      className={twMerge(
        "PageHeader flex items-center justify-between",
        className
      )}
    >
      <div className={columnClassName}>
        {withGoBack ? <GoBack /> : null}
        <h1 className={twMerge("h1 py-[--pad]", titleClassName)}>{title}</h1>
        {childrenLeft}
      </div>
      <div className={columnClassName}>{childrenRight}</div>
    </header>
  );
};

PageHeader.GoToNewButton = GoToNewButton;

export default PageHeader;
