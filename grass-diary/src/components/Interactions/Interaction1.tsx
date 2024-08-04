import styled from 'styled-components';
import { semantic } from '@styles/semantic';

const Interaction1 = ({ onClick, radius }: InteractionProps) => {
  return <Interaction onClick={onClick} radius={radius}></Interaction>;
};

export default Interaction1;

const Interaction = styled.button<{ radius: number | undefined }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: ${props => props.radius || 0}px;
  // opacity: var(--opacity-subtlest, 0);
  background: rgba(38, 38, 38, 0);
  cursor: pointer;

  &:hover {
    // opacity: var(--opacity-subtlest, 0.05);
    background: rgba(38, 38, 38, 0.05);
  }

  &:active {
    // opacity: var(--opacity-subtler, 0.08);
    background: rgba(38, 38, 38, 0.08);
  }

  &:focus {
    border: var(--stroke-thick, 2px) solid
      ${semantic.light.interactive.solid.focused};
    // opacity: var(--opacity-visible, 1);
  }
`;
