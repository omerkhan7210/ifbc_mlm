import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import logo from '/images/logo/IFBC1.png'
import logoCollapse from '/images/logo/IFBC2.png'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
    sideNavCollapse?: boolean
}

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
        logoWidth = 'auto',
        sideNavCollapse,
    } = props

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                className={`object-contain ${imgClass}`}
                src={!sideNavCollapse ? logo : logoCollapse}
                alt={`IFBC logo`}
            />
        </div>
    )
}

export default Logo
