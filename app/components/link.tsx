import * as React from "react";
import cx from "clsx";
import { NavLink, Link } from "react-router-dom";
import { isExternalUrl } from "~/utils/links";
import { isFunction } from "~/utils/type-utils";
import { IconArrowRight } from "~/components/icons";
import type { LinkProps, NavLinkProps } from "react-router-dom";

const CustomNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, ...props }, ref) => {
    if (typeof to === "string" && isExternalUrl(to)) {
      let {
        caseSensitive,
        end,
        replace,
        state,
        className,
        style,
        ...domProps
      } = props;
      return (
        <a
          {...domProps}
          href={to}
          className={
            isFunction(className) ? className({ isActive: false }) : className
          }
          style={isFunction(style) ? style({ isActive: false }) : style}
          ref={ref}
        />
      );
    }
    return <NavLink to={to} {...props} ref={ref} />;
  }
);
CustomNavLink.displayName = "NavLink";

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, ...props }, ref) => {
    if (typeof to === "string" && isExternalUrl(to)) {
      let { replace, state, ...domProps } = props;
      return <a {...domProps} ref={ref} href={to} />;
    }
    return <Link to={to} {...props} ref={ref} />;
  }
);
CustomLink.displayName = "Link";

const ArrowLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <CustomLink
        className={cx(className, "group items-center", {
          "inline-flex": !(
            className && /\b(flex|block|inline-block|inline)\b/g.test(className)
          ),
        })}
        {...props}
        ref={ref}
      >
        <span className="mr-3">{children}</span>
        <IconArrowRight
          className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
          aria-hidden
        />
      </CustomLink>
    );
  }
);

export { CustomNavLink as NavLink, CustomLink as Link, ArrowLink };
export type { NavLinkProps, LinkProps };