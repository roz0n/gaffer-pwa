import React from "react";
import PropTypes from "prop-types";
import Radium, { Style } from "radium";

// Returns a @media string
const getMediaQuery = (type, value, condensed = false) =>
    !condensed
        ? `@media screen and (${type}-width: ${String(value)}px)`
        : `(${type}-width: ${String(value)}px)`;

const generateMediaQueries = ({ max, min, maxStyles, minStyles }) => {
    return {
        [getMediaQuery("max", max)]: {
            ...maxStyles
        },
        [getMediaQuery("min", min)]: {
            ...minStyles
        }
    };
};

// Disables styles of a css class based on min/max breakpoint
const generateClassNameConditionalStyles = (type, value, className) => {
    const maxQuery = {
        [getMediaQuery("max", value, true)]: {
            all: "unset !important",
        }
    };
    const minQuery = {
        [getMediaQuery("min", value, true)]: {
            all: "unset !important",
        }
    };
    const styleRules = type === "max" ? maxQuery : minQuery;

    return (
        <Style
            scopeSelector={`.${className}`}
            rules={{ mediaQueries: styleRules }}
        />
    );
};

let Breakpoint = props => {
    const {
        max,
        min,
        maxStyles,
        minStyles,
        maxClassName,
        minClassName,
        content,
        children
    } = props;
    const options = {
        max,
        min,
        maxStyles,
        minStyles
    };
    const styles = generateMediaQueries(options);
    const className = `breakpoint-container ${maxClassName || ""} ${minClassName || ""}`;

    return (
        <article
            className={className}
            style={[styles]}
        >
            {generateClassNameConditionalStyles(
                "maxWidth",
                max,
                maxClassName || ""
            )}
            {generateClassNameConditionalStyles(
                "minWidth",
                min,
                minClassName || ""
            )}
            {content && content}
            {children && children}
        </article>
    );
};

Breakpoint.propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    content: PropTypes.func,
    maxStyles: PropTypes.object,
    minStyles: PropTypes.object,
    maxClassName: PropTypes.string,
    minClassName: PropTypes.string
};

Breakpoint = Radium(Breakpoint);