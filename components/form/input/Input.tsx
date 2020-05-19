import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import css from './Input.module.scss'

export type InputType = 'text' | 'password' | 'email'

export type InputAutocompleteType =
  | 'name'
  | 'email'
  | 'new-password'
  | 'off'
  | 'username'

export const Input = forwardRef(
  (
    props: {
      ref?: any
      value?: string
      onChange?: (newVal: string) => void
      onFocus?: (ref: any) => void
      onEnter?: () => void
      onBlur?: () => void
      onKeyDown?: (
        event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => void
      width?: string
      className?: string
      name?: string
      testId?: string
      placeholder?: string
      maxLength?: number
      autofocus?: boolean
      readOnly?: boolean
      borderless?: boolean
      inputType?: InputType
      autoComplete?: InputAutocompleteType
      multiline?: boolean
      notResizable?: boolean
      label?: React.ReactNode
    },
    ref?: any,
  ) => {
    const onChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (props.onChange) {
        let newVal = event.target.value
        props.onChange(newVal)
      }
    }
    const defaultOnKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (event.keyCode === 13) {
        if (props.onEnter) {
          props.onEnter()
        }
      }
    }

    const onKeyDown = props.onKeyDown || defaultOnKeyDown

    let refTextArea = React.createRef<HTMLTextAreaElement>()
    let refInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (props.autofocus) {
        // Timing issue, this needs to be run on the next frame
        setTimeout(() => {
          if (refInput.current) {
            refInput.current.focus()
          }
        }, 60 / 1000) // 1/60th of a second
      }
    }, [props.autofocus, refInput])

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (refInput.current) {
          refInput.current.focus()
        }
        if (refTextArea.current) {
          refTextArea.current.focus()
        }
      },
      blur: () => {
        if (refInput.current) {
          refInput.current.blur()
        }
        if (refTextArea.current) {
          refTextArea.current.blur()
        }
      },
      setSelectionRange: (start: number, end: number) => {
        if (refInput.current) {
          refInput.current.setSelectionRange(start, end)
        }
        if (refTextArea.current) {
          refTextArea.current.setSelectionRange(start, end)
        }
      },
    }))

    let className = css.inputText
    // if (!props.multiline) {
    //   className += ' ' + classes.singleLine
    // }
    if (props.readOnly) {
      className += ' ' + css.readOnly
    }
    if (props.borderless) {
      className += ' ' + css.borderless
    }
    if (props.notResizable) {
      className += ' ' + css.notResizable
    }

    let { autoComplete: autocomplete } = props
    if (autocomplete === 'off' || !autocomplete) {
      autocomplete = ('' + Math.random()) as any
    }

    if (props.multiline) {
      return (
        <div>
          <textarea
            ref={refTextArea}
            className={className}
            onChange={onChange}
            value={props.value}
            style={{
              width: props.width,
              minWidth: props.width,
            }}
            name={props.name}
            data-testid={props.testId}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            onFocus={
              props.onFocus &&
              (() => props.onFocus && props.onFocus(refTextArea.current))
            }
            onKeyDown={onKeyDown}
            readOnly={props.readOnly}
            onBlur={props.onBlur}
            rows={8}
            autoComplete={autocomplete}
          />
        </div>
      )
    }

    return (
      <div>
        <label>{props.label}</label>
        <input
          ref={refInput}
          className={className}
          type={props.inputType || 'text'}
          onChange={onChange}
          value={props.value}
          style={{
            width: props.width,
            minWidth: props.width,
          }}
          name={props.name}
          data-testid={props.testId}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          onFocus={
            props.onFocus &&
            (() => props.onFocus && props.onFocus(refInput.current))
          }
          onKeyDown={onKeyDown}
          readOnly={props.readOnly}
          onBlur={props.onBlur}
          autoComplete={autocomplete}
        />
      </div>
    )
  },
)
