import React from "react";
import { twMerge } from "tailwind-merge";

import { CardProps as Props } from "./Card.types";
import { CardHeader, CardTitle } from "ui/card";
import { Card, CardContent, CardDescription } from "ui/card";

const CardItem = (props: Props) => {
  const { className, icon, title, description } = props;

  return (
    <Card className={twMerge("Card flex flex-col gap-4 p-8", className)}>
      <CardContent className="flex items-center justify-center p-0">
        {icon}
      </CardContent>
      <CardHeader className="p-0">
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CardItem;
