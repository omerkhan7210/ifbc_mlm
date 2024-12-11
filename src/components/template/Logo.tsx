import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import logo from '/images/logo/IFBC1.png'
import logoWhite from '/images/logo/IFBC 3.png'
import logoCollapse from '/images/logo/IFBC2.png'
import { useThemeStore } from '@/store/themeStore'

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
    const defaultLayout = useThemeStore((state) => state.layout)
    const getLogo = (layoutType: string) => {
        switch (layoutType) {
            case 'full':
                return logo
            case 'framelessSide':
                return logoWhite
            case 'contentOverlay':
                return logoWhite
            default:
                return logo
        }
    }

    const layoutLogo = getLogo(defaultLayout.type)
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
                src={!sideNavCollapse ? layoutLogo : logoCollapse}
                alt={`IFBC logo`}
            />
        </div>
    )
}

export default Logo
