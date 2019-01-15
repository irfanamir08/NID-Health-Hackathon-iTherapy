<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Session $session
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('List Sessions'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Therapy'), ['controller' => 'Therapy', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Therapy'), ['controller' => 'Therapy', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="sessions form large-9 medium-8 columns content">
    <?= $this->Form->create($session) ?>
    <fieldset>
        <legend><?= __('Add Session') ?></legend>
        <?php
            echo $this->Form->control('therapy_id', ['options' => $therapy]);
            echo $this->Form->control('sessionNum');
            echo $this->Form->control('accuracy');
            echo $this->Form->control('time');
            echo $this->Form->control('onTime');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
