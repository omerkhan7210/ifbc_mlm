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
    const stageColors = {
        'New Deal': 'bg-blue-600 text-white',
        'Initial Call Attempt': 'bg-yellow-500 text-gray-900',
        Connected: 'bg-green-500 text-white',
        'Spoton / Candidate Research': 'bg-teal-500 text-white',
        'Research & Prepare Presentation': 'bg-indigo-500 text-white',
        'Present Franchise Review': 'bg-purple-500 text-white',
        'Intro to Zor': 'bg-pink-500 text-white',
        'Franchise Due Diligence': 'bg-orange-500 text-white',
        'Validate - FSO': 'bg-amber-600 text-white',
        'Discovery/Day Award - FSO': 'bg-lime-600 text-white',
        'Closed Won': 'bg-emerald-500 text-white',
        'Closed Lost': 'bg-red-500 text-white',
        'On Hold': 'bg-gray-400 text-white',
    };

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
