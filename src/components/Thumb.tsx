import React, { Component } from 'react'
import { Animated, Image } from 'react-native'
import { ToggleStyles } from '../styles/GlobalStyles'
const ic_switch_on = require('../../assets/SwitchOn.png')
const ic_switch_off = require('../../assets/SwitchOff.png')

export interface ThumbProps {
  disabled?: boolean
  range?: any
  animatedValue?: any
  width: number
  size: number
  value?: any
  icons?: {
    true?: string
    false?: string
  }
  iconColors?: {
    true?: string
    false?: string
  }
  noIcon?: boolean
  disabledIconColor?: string
  height?: number
  colors?: {
    true?: any
    false?: any
  }
  disabledColor?: string
  pressIndicator?: any
}

export default class Thumb extends Component<ThumbProps> {
  constructor(props: ThumbProps) {
    super(props)
  }

  render() {
    const {
      disabled,
      range,
      animatedValue,
      width,
      size,
      value,
      colors = {
        true: 'rgb(52, 149, 235)',
        false: 'rgb(255, 255, 255)',
      },
      icons = {
        true: ic_switch_on,
        false: ic_switch_off,
      },
      iconColors = {
        true: '#FFFFFF',
        false: '#9499AD',
      },
      noIcon = false,
      disabledIconColor = '#FFFFFF',
      disabledColor = '#9499AD',
    } = this.props

    const radius = Math.round(size / 2)

    const color = disabled
      ? disabledColor
      : animatedValue.interpolate({
          inputRange: range,
          outputRange: [colors.false, colors.true],
        })

    const position = animatedValue.interpolate({
      inputRange: range,
      outputRange: [0, width - size],
    })

    const pressedIndicatorPosition = animatedValue.interpolate({
      inputRange: range,
      outputRange: [0 - radius, width - radius - size],
    })
    // @ts-ignore
    const iconColor = disabled ? disabledIconColor : iconColors[value]

    return (
      <>
        {this.props.pressIndicator && (
          <Animated.View
            style={[
              ToggleStyles.pressedIndicator,
              {
                backgroundColor: color,
                left: pressedIndicatorPosition,
                width: size * 2,
                borderRadius: size,
                top: 0 - radius,
                aspectRatio: 1,
              },
            ]}
          />
        )}
        <Animated.View
          style={[
            ToggleStyles.thumb,
            {
              backgroundColor: color,
              left: position,
              width: size,
              borderRadius: radius,
              aspectRatio: 1,
            },
          ]}
        >
          {noIcon || (
            <Image
              // @ts-ignore
              source={icons[value]}
              style={[
                ToggleStyles.icon,
                { width: '50%', aspectRatio: 1, tintColor: iconColor[value] },
              ]}
            />
          )}
        </Animated.View>
      </>
    )
  }
}
