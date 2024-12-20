import {
  type ComponentProps,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";

export interface BoxOwnProps<E extends ElementType = ElementType> {
  as?: E;
}

export type BoxProps<E extends ElementType> = BoxOwnProps<E> &
  Omit<ComponentProps<E>, keyof BoxOwnProps>;

export type Box<DefaultProps> = <E extends ElementType = "div">(
  props: BoxProps<E> & DefaultProps,
) => ReactElement | ReactNode | null;

export type BoxRF<T> = BoxOwnProps & T;
