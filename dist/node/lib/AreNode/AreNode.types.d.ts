type AreNodeProps = {
    component: string;
    scope: string;
    markup: string;
};
type AreNodeOptionalProps = {
    id?: string;
    styles?: string;
    template?: string;
};
type AreNodeNewProps = AreNodeProps & AreNodeOptionalProps;

export type { AreNodeNewProps, AreNodeOptionalProps, AreNodeProps };
