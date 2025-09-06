import React from 'react';
import Animated, {
    FadeIn,
    FadeOut,
    FadeInUp,
    FadeOutDown,
    FadeInDown,
    FadeOutUp,
} from 'react-native-reanimated';

const BASE_DURATION = 300;

export const enter = {
    fade: FadeIn.duration(BASE_DURATION),
    fadeUp: FadeInUp.duration(BASE_DURATION),
    fadeDown: FadeInDown.duration(BASE_DURATION),
};

export const exit = {
    fade: FadeOut.duration(BASE_DURATION),
    fadeUp: FadeOutDown.duration(BASE_DURATION),
    fadeDown: FadeOutUp.duration(BASE_DURATION),
};

export type AnimatedViewProps = React.ComponentProps<typeof Animated.View>;
type EnterExit = { entering?: any; exiting?: any };

const AnimatedView = Animated.View as unknown as React.ComponentType<
    AnimatedViewProps & EnterExit
>;

export function Fade(
    { entering = enter.fade, exiting = exit.fade, ...rest }: AnimatedViewProps & EnterExit
) {
    return React.createElement(AnimatedView, { entering, exiting, ...rest });
}

export function FadeUp(
    { entering = enter.fadeUp, exiting = exit.fadeUp, ...rest }: AnimatedViewProps & EnterExit
) {
    return React.createElement(AnimatedView, { entering, exiting, ...rest });
}

export function FadeDown(
    { entering = enter.fadeDown, exiting = exit.fadeDown, ...rest }: AnimatedViewProps & EnterExit
) {
    return React.createElement(AnimatedView, { entering, exiting, ...rest });
}

const animation = {
    ...Animated,
    enter,
    exit,
    Fade,
    FadeUp,
    FadeDown,
} as typeof Animated & {
    enter: typeof enter;
    exit: typeof exit;
    Fade: typeof Fade;
    FadeUp: typeof FadeUp;
    FadeDown: typeof FadeDown;
};

export default animation;