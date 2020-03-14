import * as React from 'react'

export interface HomePageProps {
  message: string
}

export const HomePage = (props: HomePageProps) => (
  <div className="page">
    <h1>{props.message}</h1>
  </div>
)
