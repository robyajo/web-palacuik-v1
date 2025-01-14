import { ISODateString } from 'next-auth';
import { Icons } from '@/components/icons';
type ApiData = {
    token: string;
    name: string;
    email: string;
    role: string;
}
export interface UserApi {
    expires: ISODateString
    user: {
        id: number;
        uuid: string;
        name: string;
        email: string;
        role: string;
        access_token: string;
        token_type: string;
    }
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
    user: {
        id: number;
        uuid: string;
        name: string;
        email: string;
        role: string;
        access_token: string;
        token_type: string;
    }
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
