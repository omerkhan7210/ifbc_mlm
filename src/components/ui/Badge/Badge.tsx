import { forwardRef } from 'react';
import classNames from '../utils/classNames';
import type { CommonProps } from '../@types/common';
import type { CSSProperties } from 'react';

export interface BadgeProps extends CommonProps {
    badgeStyle?: CSSProperties;
    content?: string | number;
    innerClass?: string;
    maxCount?: number;
    stage?: string; // Add a `stage` prop to dynamically assign colors
}

const Badge = forwardRef<HTMLElement, BadgeProps>((props, ref) => {
    const {
        badgeStyle,
        content,
        innerClass,
        maxCount = 99,
        stage,
        className,
        ...rest
    } = props;

    // Define colors for deal stages
    const stageColors: { [key: string]: string } = {
        'New Deal': 'bg-blue-500 text-white',
        'Initial Call Attempt': 'bg-orange-500 text-white',
        'Connected': 'bg-green-500 text-white',
        'Spoton/Candidate Research': 'bg-purple-500 text-white',
        'Research & Prep Presentation': 'bg-indigo-500 text-white',
        'Present Franchise Review': 'bg-teal-500 text-white',
        'Intro to Zor': 'bg-pink-500 text-white',
        'Franchise Due Diligence': 'bg-yellow-500 text-white',
        'Validation - FSO': 'bg-pink-800 text-white',
        'Discovery Day/Award - FSO': 'bg-cyan-500 text-white',
        'Closed Won': 'bg-emerald-500 text-white',
        'Closed Lost': 'bg-gray-500 text-white',
        'On Hold': 'bg-brown-500 text-white',
    }

    // Assign color classes based on the stage
    const colorClass = stage ? stageColors[stage] || 'bg-gray-500 text-white' : '';

    const badgeBaseClass = `rounded-full text-xs font-medium shadow-md px-3 py-1 ${colorClass}`;

    return (
        <span
            ref={ref}
            className={classNames(badgeBaseClass, innerClass, className)}
            style={badgeStyle}
            {...rest}
        >
            {typeof content === 'number' && content > maxCount ? `${maxCount}+` : content}
        </span>
    );
});

Badge.displayName = 'Badge';

export default Badge;
