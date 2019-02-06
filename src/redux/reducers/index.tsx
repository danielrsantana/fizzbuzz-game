export type RootState = Readonly<{
  framework: string,
}>;

const initialState: RootState = {
  framework: 'React with Typescript',
};

export const reducer = (state = initialState, action = {}): RootState => {
  return state;
}