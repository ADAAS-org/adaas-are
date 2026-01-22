

export type AreNodeProps = {
    component: string,
    scope: string,
    markup: string,
}

export type AreNodeOptionalProps = {
    id?: string,
    styles?: string
    template?: string
}

export type AreNodeNewProps = AreNodeProps & AreNodeOptionalProps;