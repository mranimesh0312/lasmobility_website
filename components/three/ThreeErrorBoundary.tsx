"use client";

import { Component, type ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

/** Contains WebGL/asset failures to the 3D surface so the page keeps working. */
export default class ThreeErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("[3D] scene disabled:", error instanceof Error ? error.message : error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
