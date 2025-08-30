import React from 'react';
import Animated, {
    FadeIn,
    FadeOut,
    FadeInUp,
    FadeOutDown,
} from 'react-native-reanimated';

// Presets (400ms)
export const enter = {
    fade: FadeIn.duration(400),
    fadeUp: FadeInUp.duration(400),
};

export const exit = {
    fade: FadeOut.duration(400),
    fadeUp: FadeOutDown.duration(400),
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

const animation = {
    ...Animated,
    enter,
    exit,
    Fade,
    FadeUp,
} as typeof Animated & {
    enter: typeof enter;
    exit: typeof exit;
    Fade: typeof Fade;
    FadeUp: typeof FadeUp;
};

export default animation;