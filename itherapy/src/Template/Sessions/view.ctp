<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Session $session
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit Session'), ['action' => 'edit', $session->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Session'), ['action' => 'delete', $session->id], ['confirm' => __('Are you sure you want to delete # {0}?', $session->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Sessions'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Session'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Therapy'), ['controller' => 'Therapy', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Therapy'), ['controller' => 'Therapy', 'action' => 'add']) ?> </li>
    </ul>
</nav>
<div class="sessions view large-9 medium-8 columns content">
    <h3><?= h($session->id) ?></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><?= __('Id') ?></th>
            <td><?= h($session->id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Therapy') ?></th>
            <td><?= $session->has('therapy') ? $this->Html->link($session->therapy->id, ['controller' => 'Therapy', 'action' => 'view', $session->therapy->id]) : '' ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('SessionNum') ?></th>
            <td><?= $this->Number->format($session->sessionNum) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Accuracy') ?></th>
            <td><?= $this->Number->format($session->accuracy) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Time') ?></th>
            <td><?= $this->Number->format($session->time) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('OnTime') ?></th>
            <td><?= $this->Number->format($session->onTime) ?></td>
        </tr>
    </table>
</div>
