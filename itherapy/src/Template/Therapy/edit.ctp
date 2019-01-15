<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Therapy $therapy
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $therapy->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $therapy->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Therapy'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Sessions'), ['controller' => 'Sessions', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Session'), ['controller' => 'Sessions', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="therapy form large-9 medium-8 columns content">
    <?= $this->Form->create($therapy) ?>
    <fieldset>
        <legend><?= __('Edit Therapy') ?></legend>
        <?php
            echo $this->Form->control('user_id', ['options' => $users]);
            echo $this->Form->control('typeOfInjury');
            echo $this->Form->control('startingDate');
            echo $this->Form->control('name');
            echo $this->Form->control('DOB');
            echo $this->Form->control('gender');
            echo $this->Form->control('age');
            echo $this->Form->control('medID');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
