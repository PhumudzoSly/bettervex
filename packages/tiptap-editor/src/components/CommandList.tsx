import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { CommandItem } from "../extensions/slash-command";

interface CommandListProps {
  items: CommandItem[];
  command: (item: CommandItem) => void;
}

export const CommandList = forwardRef<any, CommandListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? props.items.length - 1 : prevIndex - 1
    );
  };

  const downHandler = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === props.items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
      {props.items.length ? (
        props.items.map((item, index) => (
          <div
            key={index}
            className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${
              index === selectedIndex ? "bg-accent text-accent-foreground" : ""
            }`}
            onClick={() => selectItem(index)}
          >
            <span className="mr-2 text-lg">{item.icon}</span>
            <div className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              <span className="text-xs text-muted-foreground">
                {item.description}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="px-2 py-1.5 text-sm text-muted-foreground">
          No results
        </div>
      )}
    </div>
  );
});
