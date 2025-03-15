/**
 * Toast Notification System
 * Provides a global toast notification system with a reducer pattern for state management.
 * Features:
 * - Multiple toast types (default, destructive)
 * - Automatic removal after timeout
 * - Custom positioning
 * - Action support
 */
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000

// Type definitions for toast state management
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Type for creating a new toast (without id)
type Toast = Omit<ToasterToast, "id">

// Possible actions for the toast reducer
type ActionType = {
  type: "ADD_TOAST"
  toast: ToasterToast
} | {
  type: "UPDATE_TOAST"
  toast: Partial<ToasterToast> & { id: string }
} | {
  type: "DISMISS_TOAST"
  toastId?: string
} | {
  type: "REMOVE_TOAST"
  toastId: string
}

interface State {
  toasts: ToasterToast[]
}

// Initial state for the toast system
const memoryState: State = { toasts: [] }

// Keep track of subscribers to state changes
const listeners: ((state: State) => void)[] = []

// Current state of the toast system
let state: State = memoryState

/**
 * Manages timeouts for removing toasts after they're dismissed
 */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * Adds a toast to the removal queue after it's dismissed
 * @param toastId - ID of the toast to be removed
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * Reducer function for managing toast state
 * @param state - Current state of the toast system
 * @param action - Action to be performed
 */
function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // Dismiss all toasts if no ID is provided
      if (toastId === undefined) {
        return {
          ...state,
          toasts: state.toasts.map((t) => ({
            ...t,
            open: false,
          })),
        }
      }

      // Dismiss a specific toast by ID
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        ),
      }
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

/**
 * Dispatches actions to update toast state
 * @param action - Action to be dispatched
 */
function dispatch(action: ActionType) {
  state = reducer(state, action)
  listeners.forEach((listener) => {
    listener(state)
  })
}

/**
 * Generates a unique ID for a toast
 */
function genId() {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Creates a new toast notification
 * @param props - Toast properties including title, description, and action
 * @returns Object with methods to control the toast
 */
function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

/**
 * Hook for using the toast system
 * @returns Object containing current toast state and methods to create/dismiss toasts
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
