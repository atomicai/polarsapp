import {
  Text as DefaultText,
  View as DefaultView,
  SafeAreaView as DefaultSafeAreaView,
  TextInput as DefaultTextInput
} from 'react-native';

import { styled } from 'nativewind';

type StyleProps = {
  className?: string;
};

export type TextProps = StyleProps & DefaultText['props'];
export type ViewProps = StyleProps & DefaultView['props'];
export type SafeAreaViewProps = StyleProps & DefaultSafeAreaView['props'];
export type TextInputProps = StyleProps & DefaultTextInput['props'];

const StyledText = styled(DefaultText);
const StyledView = styled(DefaultView);
const StyledSafeAreaView = styled(DefaultSafeAreaView);
const StyledTextInput = styled(DefaultTextInput);

export function Text(props: TextProps) {
  const { className, ...otherProps } = props;

  return <StyledText className={className} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { className, ...otherProps } = props;

  return <StyledView className={className} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { className, ...otherProps } = props;

  return <StyledSafeAreaView className={className} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { className, ...otherProps } = props;

  return <StyledTextInput className={className} {...otherProps} />;
}
