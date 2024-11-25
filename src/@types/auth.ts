export type SignInCredential = {
    email: string
    username?: string
    password: string
}

export type SignInResponse = {
    token: string
    userDetails: User
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    username: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    docId?: number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    userType?: string | null
    profileImage?: string | null
    coverImage?: string | null
    isVerified?: boolean | null
    isApproved?: boolean | null
    alreadyApproved?: boolean | null
    isDeleted?: boolean | null
    isArchived?: boolean | null
    userId?: number | null
    docDate?: string | null
    updateDate?: string | null
    username?: string | null
    authority?: []
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
