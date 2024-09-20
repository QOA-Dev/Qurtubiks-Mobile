declare module 'react-native-vector-icons/FontAwesome' {
    import { Icon } from 'react-native-vector-icons/Icon';
    const FontAwesome: Icon;
    export default FontAwesome;
  }
  
  declare module 'react-native-vector-icons/Icon' {
    import { Component } from 'react';
    import { TextProps } from 'react-native';
  
    type IconButtonProps = TextProps & {
      name: string;
      size?: number;
      color?: string;
    };
  
    export class IconButton extends Component<IconButtonProps> {}
    export type Icon = typeof IconButton;
  }
  