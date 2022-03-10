import Tree from 'react-animated-tree'

<Tree content="Apple" type="Fruit" open canHide visible onClick={console.log}>
  <Tree content="Contents">
    <Tree content="Seeds" />
  </Tree>
</Tree>