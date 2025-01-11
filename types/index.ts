import { ISODateString } from 'next-auth';
import { Icons } from '@/components/icons';
type ApiData = {
    token: string;
    name: string;
    email: string;
    role: string;
}
export interface UserApi {
    id: number;
    uuid: string;
    name: string;
    email: string;
    role: string;
    token: string;
}
export interface SessionApi extends UserApi {
    user: UserApi;
    session: UserApi;
    accessToken: string;
    expires: ISODateString;
}

export interface UserSessionProps {
    user: {
        name: string;
        email: string;
        apiData: ApiData;
    };
    expires: string;
}



export interface UserApi {
    id: number;
    name: string;
    profile_photo_url: string;
    email: string;
    role: string;

    token: string;
}
export interface SessionApi extends UserApi {
    user: UserApi;
    session: UserApi;
}
// RESPON API MASYARAKAT
export interface ResponseApi {
    success: boolean;
    status: number;
    message: string;
    layanan?: string;
}





export interface NavItem {
    title: string;
    url: string;
    disabled?: boolean;
    external?: boolean;
    shortcut?: [string, string];
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
    isActive?: boolean;
    items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export interface FooterItem {
    title: string;
    items: {
        title: string;
        href: string;
        external?: boolean;
    }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type IconKey = keyof typeof Icons;
