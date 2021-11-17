import {Pipeline} from "./pipeline";

declare type ReplaceType = any;

export type RenderPipelineProcessData = {
    frameId: number;
    simulationTime: number;

    traffic: ReplaceType;
    layout: ReplaceType;

    exportedAgentData: ReplaceType;

    highlighted: ReplaceType[];
    colored: ReplaceType[];
}

declare const action: (...args: any[]) => any;

export const createRenderPipeline = () => {

    return new Pipeline<RenderPipelineProcessData>()

        //
        // TILES
        //

        .registerMapper(
            'tilesSimplified',
            ['layout'],
            ({layout: {tiles}}) =>
                tiles.map(t => action(t))
        )

        .registerMapper(
            'tileModels',
            ['tilesSimplified', 'highlighted', 'colored'],
            ({tilesSimplified, highlighted, colored}) =>
                action({
                    transitionalRenderable: tilesSimplified,
                    highlights: highlighted,
                    colors: colored
                })
        )

        .registerMapper(
            'tileNonModifiedMerged',
            ['tileModels'],
            ({tileModels: {nonModified}}) =>
                action(nonModified)
        )

        .registerMapper(
            'tileHaloMerged',
            ['tileModels'],
            ({tileModels: {halos}}) =>
                action(halos)
        )

        .registerMapper(
            'tileColoredMerged',
            ['tileModels'],
            ({tileModels: {colored}}) =>
                action(colored)
        )

        //
        // TAGS
        //

        .registerMapper(
            'tagsSimplified',
            ['layout'],
            ({layout: {tags}}) =>
                tags.map(t => action(t))
        )

        .registerMapper(
            'tagModels',
            ['tagsSimplified', 'highlighted', 'colored'],
            ({tagsSimplified, highlighted, colored}) =>
                action({
                    transitionalRenderable: tagsSimplified,
                    highlights: highlighted,
                    colors: colored
                })
        )

        .registerMapper(
            'tagNonModifiedMerged',
            ['tagModels'],
            ({tagModels: {nonModified}}) =>
                action(nonModified)
        )

        .registerMapper(
            'tagHaloMerged',
            ['tagModels'],
            ({tagModels: {halos}}) =>
                action(halos)
        )

        .registerMapper(
            'tagColoredMerged',
            ['tagModels'],
            ({tagModels: {colored}}) =>
                action(colored)
        )

        //
        // VEHICLES
        //

        .registerMapper(
            'vehiclesSimplified',
            ['traffic'],
            ({traffic: {vehicles}}) =>
                vehicles.map(t => action(t))
        )

        .registerMapper(
            'vehicleModels',
            ['vehiclesSimplified', 'highlighted', 'colored'],
            ({vehiclesSimplified, highlighted, colored}) =>
                action({
                    transitionalRenderable: vehiclesSimplified,
                    highlights: highlighted,
                    colors: colored
                })
        )

        .registerMapper(
            'vehicleNonModifiedMerged',
            ['vehicleModels'],
            ({vehicleModels: {nonModified}}) =>
                action(nonModified)
        )

        .registerMapper(
            'vehicleHaloMerged',
            ['vehicleModels'],
            ({vehicleModels: {halos}}) =>
                action(halos)
        )

        .registerMapper(
            'vehicleColoredMerged',
            ['vehicleModels'],
            ({vehicleModels: {colored}}) =>
                action(colored)
        )


        .registerMapper(
            'scene',
            [
                'tileNonModifiedMerged', 'tileHaloMerged', 'tileColoredMerged',
                'tagNonModifiedMerged', 'tagHaloMerged', 'tagColoredMerged',
                'vehicleNonModifiedMerged', 'vehicleHaloMerged', 'vehicleColoredMerged'
            ],
            (args) =>
                action(args)
        );
}
