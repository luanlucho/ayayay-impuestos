"use client";
import { User, CreditCard, Settings } from "lucide-react";
import { Calendar, Smile, Calculator } from "lucide-react";
import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { CommandBarProps as Props } from "./CommandBar.types";
import useClickOutside from "hooks/useClickOutside";
import useKeyPress from "hooks/useKeyPress";
import { Command, CommandEmpty, CommandGroup } from "ui/command";
import { CommandInput, CommandItem, CommandList } from "ui/command";
import { CommandSeparator, CommandShortcut } from "ui/command";

const CommandBar = (props: Props) => {
  const { className } = props;
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeHandler = () => {
    inputRef.current?.blur();
    setIsFocused(false);
  };

  useKeyPress("Escape", closeHandler, { enabled: isFocused });
  const ref = useClickOutside<HTMLDivElement>(isFocused, closeHandler);

  // TODO: integrar
  return (
    <Command
      ref={ref}
      className={twMerge(
        "CommandBar relative z-10 overflow-visible rounded-lg border shadow-md",
        className
      )}
    >
      <CommandInput
        placeholder="Type a command or search..."
        onFocus={() => setIsFocused(true)}
        ref={inputRef}
      />
      {isFocused ? (
        <CommandList className="bg-background absolute left-0 top-[120%] w-full rounded border">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => console.log("here")}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      ) : null}
    </Command>
  );
};

export default CommandBar;
