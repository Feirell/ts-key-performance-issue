type StrKeys<O extends {}> = Extract<keyof O, string>;

type Names<A extends {}, B extends {}> = StrKeys<A> | StrKeys<B>;
type Joined<A extends {}, B extends {}> = Pick<A & B, Names<A, B>>;


export type ValuesMap<RM, Names extends StrKeys<RM>> = {
    [Key in Names]: RM[Key]
}

export interface RegisteredMapper<Initial extends {}, RM extends {}> {
    id: StrKeys<RM>;
    dependencies: Names<Initial, RM>[],
    fnc: (arg: object) => any
}

export class Pipeline<Initial extends {}, RM extends {} = {}> {
    public rm!: RM;

    private mapper = new Map<StrKeys<RM>, RegisteredMapper<Initial, RM>>();

    registerMapper<Identifier extends string,
        RIDepending extends Names<Initial, RM>,
        MappedType>(
        id: Identifier,
        dependingOn: RIDepending[],
        fnc: (arg: ValuesMap<Joined<Initial, RM>, RIDepending>) => MappedType
    ) {
        if (typeof id != "string")
            throw new Error('Can not register mapper on a non string value.');

        // TODO add loop check
        this.mapper.set(id as any, {
            id: id as any,
            dependencies: dependingOn,
            fnc: fnc as any
        });

        type NewRM = RM & { [Key in Identifier]: MappedType };

        return this as any as Pipeline<Initial, NewRM>;
    }
}
