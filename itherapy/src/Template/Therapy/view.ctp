<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Therapy $therapy
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit Therapy'), ['action' => 'edit', $therapy->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Therapy'), ['action' => 'delete', $therapy->id], ['confirm' => __('Are you sure you want to delete # {0}?', $therapy->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Therapy'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Therapy'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Sessions'), ['controller' => 'Sessions', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Session'), ['controller' => 'Sessions', 'action' => 'add']) ?> </li>
    </ul>
</nav>
<div class="therapy view large-9 medium-8 columns content">
    <h3><?= h($therapy->id) ?></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><?= __('Id') ?></th>
            <td><?= h($therapy->id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('User') ?></th>
            <td><?= $therapy->has('user') ? $this->Html->link($therapy->user->id, ['controller' => 'Users', 'action' => 'view', $therapy->user->id]) : '' ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('TypeOfInjury') ?></th>
            <td><?= h($therapy->typeOfInjury) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Name') ?></th>
            <td><?= h($therapy->name) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Gender') ?></th>
            <td><?= h($therapy->gender) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('MedID') ?></th>
            <td><?= h($therapy->medID) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Age') ?></th>
            <td><?= $this->Number->format($therapy->age) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('StartingDate') ?></th>
            <td><?= h($therapy->startingDate) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('DOB') ?></th>
            <td><?= h($therapy->DOB) ?></td>
        </tr>
    </table>
    <div class="related">
        <h4><?= __('Related Sessions') ?></h4>
        <?php if (!empty($therapy->sessions)): ?>
        <table cellpadding="0" cellspacing="0">
            <tr>
                <th scope="col"><?= __('Id') ?></th>
                <th scope="col"><?= __('Therapy Id') ?></th>
                <th scope="col"><?= __('SessionNum') ?></th>
                <th scope="col"><?= __('Accuracy') ?></th>
                <th scope="col"><?= __('Time') ?></th>
                <th scope="col"><?= __('OnTime') ?></th>
                <th scope="col" class="actions"><?= __('Actions') ?></th>
            </tr>
            <?php foreach ($therapy->sessions as $sessions): ?>
            <tr>
                <td><?= h($sessions->id) ?></td>
                <td><?= h($sessions->therapy_id) ?></td>
                <td><?= h($sessions->sessionNum) ?></td>
                <td><?= h($sessions->accuracy) ?></td>
                <td><?= h($sessions->time) ?></td>
                <td><?= h($sessions->onTime) ?></td>
                <td class="actions">
                    <?= $this->Html->link(__('View'), ['controller' => 'Sessions', 'action' => 'view', $sessions->id]) ?>
                    <?= $this->Html->link(__('Edit'), ['controller' => 'Sessions', 'action' => 'edit', $sessions->id]) ?>
                    <?= $this->Form->postLink(__('Delete'), ['controller' => 'Sessions', 'action' => 'delete', $sessions->id], ['confirm' => __('Are you sure you want to delete # {0}?', $sessions->id)]) ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
        <?php endif; ?>
    </div>
</div>
