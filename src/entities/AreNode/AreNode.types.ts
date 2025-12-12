

export type AreNodeProps = {
    component: string,
    scope: string,
    markup: string,
}

export type AreNodeOptionalProps = {
    styles?: string
    template?: string
}

export type AreNodeNewProps = AreNodeProps & AreNodeOptionalProps;