<?php
/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link      https://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   https://opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller;

use Cake\Core\Configure;
use Cake\Http\Exception\ForbiddenException;
use Cake\Http\Exception\NotFoundException;
use Cake\View\Exception\MissingTemplateException;
use Cake\Event\Event;

/**
 * Static content controller
 *
 * This controller will render views from Template/Pages/
 *
 * @link https://book.cakephp.org/3.0/en/controllers/pages-controller.html
 */
class JsonController extends AppController
{

  public function getall(){
    $this->loadModel('Therapy');
    $this->loadModel('Sessions');

    $result = $this->Therapy->find('all',['contain'=>'Sessions'])->toArray();

    foreach($result as $r)
    {
      $r['DOB'] = date("m/d/Y", strtotime($r['DOB']));
      $r['startingDate'] = date("m/d/Y", strtotime($r['startingDate']));
      $r['attendanceTotalSessions'] = count($r['sessions']);
    }

    echo json_encode($result);
    exit();
  }

  public function beforeRender(Event $event)
{
    $this->RequestHandler->renderAs($this, 'json');
    $this->response->type('application/json');
    $this->set('_serialize', true);
}

}
